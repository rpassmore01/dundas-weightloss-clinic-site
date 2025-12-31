import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs"; // needed for fs + file handling

// Next.js: cookies() is async in route handlers
async function requireAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("auth")?.value === "true";
}

const jsonPath = path.join(process.cwd(), "data", "resources.json");
const uploadsDir = path.join(process.cwd(), "data", "resources");

async function ensureDataFiles() {
  await fs.mkdir(path.dirname(jsonPath), { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });
  try {
    await fs.access(jsonPath);
  } catch {
    await fs.writeFile(jsonPath, JSON.stringify([], null, 2));
  }
}

// ✅ robust read (handles empty/invalid json instead of 500)
async function readResources() {
  await ensureDataFiles();
  try {
    const data = await fs.readFile(jsonPath, "utf-8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch {
    await fs.writeFile(jsonPath, JSON.stringify([], null, 2));
    return [];
  }
}

async function writeResources(resources) {
  await ensureDataFiles();
  await fs.writeFile(jsonPath, JSON.stringify(resources, null, 2));
}

function safeFilename(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]/g, "_");
}

function extToContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".txt": "text/plain; charset=utf-8",
    ".csv": "text/csv; charset=utf-8",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return map[ext] || "application/octet-stream";
}

async function parseRequest(req) {
  const contentType = req.headers.get("content-type") || "";

  // multipart/form-data for file uploads
  if (contentType.includes("multipart/form-data")) {
    const fd = await req.formData();

    // ✅ needed for PUT when sending FormData
    const idRaw = fd.get("id");
    const id = idRaw ? Number(idRaw) : undefined;

    const title = String(fd.get("title") || "");
    const description = String(fd.get("description") || "");
    const client = String(fd.get("client") || "false") === "true";
    const resourceType = String(fd.get("resourceType") || "file"); // "file" | "link"
    const link = String(fd.get("link") || "");

    const fileObj = fd.get("file"); // File or null

    return {
      id,
      title,
      description,
      client,
      resourceType,
      link,
      fileObj,
    };
  }

  // JSON for link resources (or simple updates)
  const body = await req.json();
  return {
    id: body.id,
    title: body.title ?? "",
    description: body.description ?? "",
    client: Boolean(body.client),
    resourceType: body.file ? "file" : "link",
    link: body.link ?? "",
    fileObj: null,
    path: body.path ?? "",
  };
}

/**
 * GET
 * - /api/resources -> returns JSON array
 * - /api/resources?file=<filename> -> returns the stored file
 */
export async function GET(req) {
  const url = new URL(req.url);
  const fileParam = url.searchParams.get("file");

  // file download
  if (fileParam) {
    await ensureDataFiles();
    const filename = safeFilename(fileParam);
    const abs = path.join(uploadsDir, filename);

    try {
      const buf = await fs.readFile(abs);
      return new NextResponse(buf, {
        status: 200,
        headers: {
          "Content-Type": extToContentType(filename),
          "Content-Disposition": `inline; filename="${filename}"`,
        },
      });
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  }

  const resources = await readResources();
  return NextResponse.json(resources);
}

export async function POST(req) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resources = await readResources();
  const parsed = await parseRequest(req);

  const newId = resources.length ? resources[resources.length - 1].id + 1 : 1;

  // File resource (multipart)
  if (parsed.resourceType === "file") {
    if (!parsed.fileObj || typeof parsed.fileObj.arrayBuffer !== "function") {
      return NextResponse.json({ error: "Missing file upload" }, { status: 400 });
    }

    const original = safeFilename(parsed.fileObj.name || "upload");
    const storedName = `${Date.now()}_${original}`;
    const abs = path.join(uploadsDir, storedName);

    const bytes = await parsed.fileObj.arrayBuffer();
    await fs.writeFile(abs, Buffer.from(bytes));

    const newResource = {
      id: newId,
      title: parsed.title,
      description: parsed.description,
      client: parsed.client, // true=client, false=professional
      file: true,
      path: storedName,
      link: "",
      createdAt: new Date().toISOString(),
    };

    resources.push(newResource);
    await writeResources(resources);
    return NextResponse.json(resources);
  }

  // Link resource
  const newResource = {
    id: newId,
    title: parsed.title,
    description: parsed.description,
    client: parsed.client,
    file: false,
    path: "",
    link: parsed.link,
    createdAt: new Date().toISOString(),
  };

  resources.push(newResource);
  await writeResources(resources);
  return NextResponse.json(resources);
}

export async function PUT(req) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resources = await readResources();
  const parsed = await parseRequest(req);

  const id = Number(parsed.id);
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const index = resources.findIndex((r) => r.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = resources[index];

  // If updating to file via multipart (possibly replacing old file)
  if (parsed.resourceType === "file") {
    if (!parsed.fileObj || typeof parsed.fileObj.arrayBuffer !== "function") {
      // allow updating title/desc/client without replacing file
      resources[index] = {
        ...existing,
        title: parsed.title,
        description: parsed.description,
        client: parsed.client,
        file: true,
        link: "",
      };
      await writeResources(resources);
      return NextResponse.json(resources);
    }

    // delete old stored file if it existed
    if (existing.file && existing.path) {
      const oldAbs = path.join(uploadsDir, safeFilename(existing.path));
      try {
        await fs.unlink(oldAbs);
      } catch {}
    }

    const original = safeFilename(parsed.fileObj.name || "upload");
    const storedName = `${Date.now()}_${original}`;
    const abs = path.join(uploadsDir, storedName);

    const bytes = await parsed.fileObj.arrayBuffer();
    await fs.writeFile(abs, Buffer.from(bytes));

    resources[index] = {
      ...existing,
      title: parsed.title,
      description: parsed.description,
      client: parsed.client,
      file: true,
      path: storedName,
      link: "",
      updatedAt: new Date().toISOString(),
    };

    await writeResources(resources);
    return NextResponse.json(resources);
  }

  // Updating to link
  if (existing.file && existing.path) {
    const oldAbs = path.join(uploadsDir, safeFilename(existing.path));
    try {
      await fs.unlink(oldAbs);
    } catch {}
  }

  resources[index] = {
    ...existing,
    title: parsed.title,
    description: parsed.description,
    client: parsed.client,
    file: false,
    path: "",
    link: parsed.link,
    updatedAt: new Date().toISOString(),
  };

  await writeResources(resources);
  return NextResponse.json(resources);
}

export async function DELETE(req) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const resources = await readResources();

  const idx = resources.findIndex((r) => r.id === id);
  if (idx === -1) return NextResponse.json(resources);

  const toDelete = resources[idx];

  // delete stored file if needed
  if (toDelete.file && toDelete.path) {
    const abs = path.join(uploadsDir, safeFilename(toDelete.path));
    try {
      await fs.unlink(abs);
    } catch {}
  }

  const next = resources.filter((r) => r.id !== id);
  await writeResources(next);
  return NextResponse.json(next);
}
