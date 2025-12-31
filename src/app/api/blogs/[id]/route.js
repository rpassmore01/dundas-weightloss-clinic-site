import fs from "fs";
import path from "path";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

const dataPath = path.join(process.cwd(), "data", "blogs.json");

async function requireAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("auth")?.value === "true";
}

function readBlogs() {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

function writeBlogs(blogs) {
  fs.writeFileSync(dataPath, JSON.stringify(blogs, null, 2));
}

export async function GET(req, context) {
  const { id } = await context.params;

  const blogs = readBlogs();
  const blog = blogs.find(b => Number(b.id) === Number(id));

  if (!blog) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(blog);
}

export async function PUT(req, context) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;

  const { title, body, date } = await req.json();
  const blogs = readBlogs();

  const index = blogs.findIndex((b) => Number(b.id) === Number(id));

  if (index === -1) {
    return new Response("Not found", { status: 404 });
  }

  blogs[index] = {
    ...blogs[index],
    title,
    body,
    date,
  };

  writeBlogs(blogs);

  return Response.json(blogs[index]);
}

export async function DELETE(req, context) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  const { id } = await context.params;

  const blogs = readBlogs();
  const filtered = blogs.filter((b) => Number(b.id) === Number(id));

  writeBlogs(filtered);

  return new Response(null, { status: 204 });
}
