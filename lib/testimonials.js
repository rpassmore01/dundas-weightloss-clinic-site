// lib/testimonials.js
import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";

const filePath = path.join(process.cwd(), "data", "testimonials.json");

async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch (err) {
    if (err?.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
      return;
    }
    throw err;
  }
}

async function requireAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("auth")?.value === "true";
}

async function readTestimonials() {
  await ensureFileExists();
  const data = await fs.readFile(filePath, "utf-8");
  return data ? JSON.parse(data) : [];
}

async function writeTestimonials(testimonials) {
  await fs.writeFile(filePath, JSON.stringify(testimonials, null, 2), "utf-8");
}

function toTestimonial(body, { id } = {}) {
  return {
    id,
    name: body?.name ?? "",
    date: body?.date ?? "",
    stars: Number(body?.stars ?? 0),
    message: body?.message ?? "",
  };
}

export async function listTestimonials() {
  return await readTestimonials();
}

export async function addTestimonial(body) {
  if (!(await requireAuth())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const testimonials = await readTestimonials();
  const nextId = testimonials.length ? testimonials[testimonials.length - 1].id + 1 : 1;

  const newTestimonial = toTestimonial(body, { id: nextId });
  testimonials.push(newTestimonial);

  await writeTestimonials(testimonials);
  return testimonials;
}

export async function updateTestimonial(body) {
  if (!(await requireAuth())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const testimonials = await readTestimonials();
  const id = body?.id;

  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) {
    const err = new Error("Not found");
    err.status = 404;
    throw err;
  }

  testimonials[index] = {
    ...testimonials[index],
    ...toTestimonial(body, { id: testimonials[index].id }),
  };

  await writeTestimonials(testimonials);
  return testimonials;
}

export async function deleteTestimonial(id) {
  if (!(await requireAuth())) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }

  const testimonials = await readTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);

  await writeTestimonials(filtered);
  return filtered;
}
