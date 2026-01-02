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

export async function GET() {
  const blogs = readBlogs();

  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return Response.json(blogs);
}

export async function POST(req) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, body, description, date } = await req.json();

  const blogs = readBlogs();

  const newBlog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title,
    description,
    body,
    date,
  };

  blogs.push(newBlog);
  writeBlogs(blogs);

  return Response.json(newBlog, { status: 201 });
}
