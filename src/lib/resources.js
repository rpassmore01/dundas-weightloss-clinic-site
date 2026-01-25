// lib/resources.js
import { promises as fs } from "fs";
import path from "path";
import { isAuthenticated } from "./auth";

const jsonPath = path.join(process.cwd(), "data", "resources.json");
const uploadsDir = path.join(process.cwd(), "data", "resources");

async function ensureDataFiles() {
  await fs.mkdir(path.dirname(jsonPath), { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });
  try {
    await fs.access(jsonPath);
  } catch {
    await fs.writeFile(jsonPath, JSON.stringify([], null, 2), "utf-8");
  }
}


// robust read (handles empty/invalid json)
async function readResources() {
  await ensureDataFiles();
  try {
    const data = await fs.readFile(jsonPath, "utf-8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch {
    await fs.writeFile(jsonPath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
}

async function writeResources(resources) {
  await ensureDataFiles();
  await fs.writeFile(jsonPath, JSON.stringify(resources, null, 2), "utf-8");
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
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".xls": "application/vnd.ms-excel",
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return map[ext] || "application/octet-stream";
}

/**
 * Helpers for callers that pass in a File (from req.formData()).
 * In route handlers, file is a Web File with arrayBuffer().
 */
async function saveUploadedFile(fileObj) {
  if (!fileObj || typeof fileObj.arrayBuffer !== "function") {
    const err = new Error("Missing file upload");
    err.status = 400;
    throw err;
  }

  await ensureDataFiles();

  const original = safeFilename(fileObj.name || "upload");
  const storedName = `${Date.now()}_${original}`;
  const abs = path.join(uploadsDir, storedName);

  const bytes = await fileObj.arrayBuffer();
  await fs.writeFile(abs, Buffer.from(bytes));

  return { storedName, abs };
}

async function deleteStoredFileIfExists(storedName) {
  if (!storedName) return;
  const abs = path.join(uploadsDir, safeFilename(storedName));
  try {
    await fs.unlink(abs);
  } catch {}
}

/**
 * Public API
 * Data records are the same shape you already used:
 * { id, title, description, client, file, path, link, createdAt, updatedAt }
 */

export async function listResources() {
  return await readResources();
}

/**
 * Get file bytes + headers info for download/inline rendering.
 * (Route handler can turn this into a NextResponse.)
 */
export async function getResourceFile(fileParam) {
  await ensureDataFiles();

  const filename = safeFilename(fileParam);
  const abs = path.join(uploadsDir, filename);

  try {
    const buf = await fs.readFile(abs);
    return {
      ok: true,
      buffer: buf,
      filename,
      contentType: extToContentType(filename),
      disposition: `inline; filename="${filename}"`,
    };
  } catch {
    const err = new Error("File not found");
    err.status = 404;
    throw err;
  }
}

export async function createResourceFromFormData(formData) {
  if (!(await isAuthenticated())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const resources = await readResources();

  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const client = String(formData.get("client") || "false") === "true";
  const resourceType = String(formData.get("resourceType") || "file"); // "file" | "link"
  const link = String(formData.get("link") || "");
  const fileObj = formData.get("file"); // File or null

  const newId = resources.length ? Number(resources[resources.length - 1].id) + 1 : 1;

  if (resourceType === "file") {
    const { storedName } = await saveUploadedFile(fileObj);

    const newResource = {
      id: newId,
      title,
      description,
      client,
      file: true,
      path: storedName,
      link: "",
      createdAt: new Date().toISOString(),
    };

    resources.push(newResource);
    await writeResources(resources);
    return resources;
  }

  const newResource = {
    id: newId,
    title,
    description,
    client,
    file: false,
    path: "",
    link,
    createdAt: new Date().toISOString(),
  };

  resources.push(newResource);
  await writeResources(resources);
  return resources;
}

export async function createResourceFromJson(body) {
  if (!(await isAuthenticated())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const resources = await readResources();
  const newId = resources.length ? Number(resources[resources.length - 1].id) + 1 : 1;

  const newResource = {
    id: newId,
    title: body?.title ?? "",
    description: body?.description ?? "",
    client: Boolean(body?.client),
    file: false,
    path: "",
    link: body?.link ?? "",
    createdAt: new Date().toISOString(),
  };

  resources.push(newResource);
  await writeResources(resources);
  return resources;
}

/**
 * Update from FormData.
 * - If resourceType === "file" and file missing: update metadata only (keep existing file)
 * - If new file provided: replace old stored file
 * - If updating to link: deletes old stored file (if any)
 */
export async function updateResourceFromFormData(formData) {
  if (!(await isAuthenticated())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : undefined;
  if (!id) {
    const err = new Error("Missing id");
    err.status = 400;
    throw err;
  }

  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const client = String(formData.get("client") || "false") === "true";
  const resourceType = String(formData.get("resourceType") || "file"); // "file" | "link"
  const link = String(formData.get("link") || "");
  const fileObj = formData.get("file"); // File or null

  const resources = await readResources();
  const index = resources.findIndex((r) => Number(r.id) === Number(id));
  if (index === -1) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }

  const existing = resources[index];

  if (resourceType === "file") {
    // No new file: keep existing file, update metadata
    if (!fileObj || typeof fileObj.arrayBuffer !== "function") {
      resources[index] = {
        ...existing,
        title,
        description,
        client,
        file: true,
        link: "",
        updatedAt: new Date().toISOString(),
      };
      await writeResources(resources);
      return resources;
    }

    // Replace file
    if (existing.file && existing.path) {
      await deleteStoredFileIfExists(existing.path);
    }

    const { storedName } = await saveUploadedFile(fileObj);

    resources[index] = {
      ...existing,
      title,
      description,
      client,
      file: true,
      path: storedName,
      link: "",
      updatedAt: new Date().toISOString(),
    };

    await writeResources(resources);
    return resources;
  }

  // Updating to link: delete old file if any
  if (existing.file && existing.path) {
    await deleteStoredFileIfExists(existing.path);
  }

  resources[index] = {
    ...existing,
    title,
    description,
    client,
    file: false,
    path: "",
    link,
    updatedAt: new Date().toISOString(),
  };

  await writeResources(resources);
  return resources;
}

export async function updateResourceFromJson(body) {
  if (!(await isAuthenticated())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const id = Number(body?.id);
  if (!id) {
    const err = new Error("Missing id");
    err.status = 400;
    throw err;
  }

  const resources = await readResources();
  const index = resources.findIndex((r) => Number(r.id) === Number(id));
  if (index === -1) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }

  const existing = resources[index];

  // JSON updates are typically link-style or metadata-only
  const title = body?.title ?? existing.title;
  const description = body?.description ?? existing.description;
  const client = body?.client !== undefined ? Boolean(body.client) : existing.client;

  // If caller says file, treat accordingly; otherwise default to link
  const isFile = Boolean(body?.file);

  if (isFile) {
    // metadata-only file update
    resources[index] = {
      ...existing,
      title,
      description,
      client,
      file: true,
      link: "",
      updatedAt: new Date().toISOString(),
    };
    await writeResources(resources);
    return resources;
  }

  // switch to link: delete old file if any
  if (existing.file && existing.path) {
    await deleteStoredFileIfExists(existing.path);
  }

  resources[index] = {
    ...existing,
    title,
    description,
    client,
    file: false,
    path: "",
    link: body?.link ?? "",
    updatedAt: new Date().toISOString(),
  };

  await writeResources(resources);
  return resources;
}

export async function deleteResourceById(id) {
  if (!(await isAuthenticated())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const resources = await readResources();
  const numericId = Number(id);

  const idx = resources.findIndex((r) => Number(r.id) === numericId);
  if (idx === -1) return resources;

  const toDelete = resources[idx];

  if (toDelete.file && toDelete.path) {
    await deleteStoredFileIfExists(toDelete.path);
  }

  const next = resources.filter((r) => Number(r.id) !== numericId);
  await writeResources(next);
  return next;
}
