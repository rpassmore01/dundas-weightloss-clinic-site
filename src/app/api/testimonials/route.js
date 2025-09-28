import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function requireAuth() {
  const isAuthed = cookies().get("auth")?.value === "true";
  if (!isAuthed) {
    return false;
  }
  return true;
}

const filePath = path.join(process.cwd(), "data", "testimonials.json");

async function readTestimonials() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeTestimonials(testimonials) {
  await fs.writeFile(filePath, JSON.stringify(testimonials, null, 2));
}

export async function GET() {
  const testimonials = await readTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(req) {
  if (!requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const testimonials = await readTestimonials();

  const newTestimonial = {
    id: testimonials.length ? testimonials[testimonials.length - 1].id + 1 : 1,
    name: body.name,
    date: body.date,
    stars: Number(body.stars),
    message: body.message,
  };

  testimonials.push(newTestimonial);
  await writeTestimonials(testimonials);

  return NextResponse.json(testimonials);
}

export async function PUT(req) {
  if (!requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const testimonials = await readTestimonials();

  const index = testimonials.findIndex((t) => t.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  testimonials[index] = {
    ...testimonials[index],
    name: body.name,
    date: body.date,
    stars: Number(body.stars),
    message: body.message,
  };

  await writeTestimonials(testimonials);

  return NextResponse.json(testimonials);
}

export async function DELETE(req) {
  if (!requireAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  let testimonials = await readTestimonials();

  testimonials = testimonials.filter((t) => t.id !== id);
  await writeTestimonials(testimonials);

  return NextResponse.json(testimonials);
}
