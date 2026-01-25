// lib/blogs.js
import { promises as fs } from "fs";
import path from "path";
import { isAuthenticated } from "./auth";

const dataPath = path.join(process.cwd(), "data", "blogs.json");

async function ensureFileExists() {
    try {
        await fs.access(dataPath);
    } catch (err) {
        if (err?.code === "ENOENT") {
            await fs.mkdir(path.dirname(dataPath), { recursive: true });
            await fs.writeFile(dataPath, JSON.stringify([], null, 2), "utf-8");
            return;
        }
        throw err;
    }
}


async function readBlogs() {
    await ensureFileExists();
    const raw = await fs.readFile(dataPath, "utf-8");
    return raw ? JSON.parse(raw) : [];
}

async function writeBlogs(blogs) {
    await fs.writeFile(dataPath, JSON.stringify(blogs, null, 2), "utf-8");
}

/**
 * Public API (Server Component safe)
 */

export async function listBlogs() {
    const blogs = await readBlogs();

    // Match your GET: newest first
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    return blogs;
}

export async function getBlogById(id) {
    const blogs = await readBlogs();
    const blog = blogs.find((b) => Number(b.id) === Number(id));

    if (!blog) {
        const err = new Error("Not found");
        err.status = 404;
        throw err;
    }

    return blog;
}

export async function createBlog(body) {
    if (!(await isAuthenticated())) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }

    const { title, body: contentBody, description, date } = body ?? {};
    const blogs = await readBlogs();

    const newBlog = {
        id: blogs.length ? Number(blogs[blogs.length - 1].id) + 1 : 1,
        title,
        description,
        body: contentBody,
        date,
    };

    blogs.push(newBlog);
    await writeBlogs(blogs);

    return newBlog; // caller can treat as created (201)
}

export async function updateBlogById(id, updates) {
    if (!(await isAuthenticated())) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }

    const { title, body, description, date } = updates ?? {};
    const blogs = await readBlogs();

    const index = blogs.findIndex((b) => Number(b.id) === Number(id));
    if (index === -1) {
        const err = new Error("Not found");
        err.status = 404;
        throw err;
    }

    blogs[index] = {
        ...blogs[index],
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(body !== undefined ? { body } : {}),
        ...(date !== undefined ? { date } : {}),
    };

    await writeBlogs(blogs);
    return blogs[index];
}

export async function deleteBlogById(id) {
    if (!(await isAuthenticated())) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }

    const blogs = await readBlogs();
    const filtered = blogs.filter((b) => Number(b.id) !== Number(id));

    await writeBlogs(filtered);

    return { ok: true };
}
