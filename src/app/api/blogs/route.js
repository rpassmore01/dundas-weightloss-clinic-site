import fs from "fs";
import path from "path";
import {NextResponse} from "next/server";
import { isAuthenticated } from "../../../lib/auth";

const dataPath = path.join(process.cwd(), "data", "blogs.json");


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
  if (!(await isAuthenticated()))
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
