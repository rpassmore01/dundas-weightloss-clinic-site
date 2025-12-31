"use client";

import { useEffect, useState } from "react";
import BlogForm from "../../../../components/BlogForm";

export default function BlogsEditPage() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  async function loadBlogs() {
    const res = await fetch("/api/blogs");
    setBlogs(await res.json());
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  async function saveBlog(data) {
    if (editingBlog?.id) {
      await fetch(`/api/blogs/${editingBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    setEditingBlog(null);
    loadBlogs();
  }

  async function deleteBlog(id) {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    loadBlogs();
  }

  return (
    <main>
      <section className="w-full px-6 py-12 space-y-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-sky-900">
              Blog Manager
            </h1>
            <p className="text-sky-700 text-sm mt-1">
              Create, edit, and manage blog posts
            </p>
          </div>

          {!editingBlog && (
            <button
              onClick={() =>
                setEditingBlog({
                  title: "",
                  body: "",
                  date: new Date().toISOString().split("T")[0],
                })
              }
              className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
            >
              + Create Blog
            </button>
          )}
        </div>

        {/* Blog list */}
        {!editingBlog && (
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {blogs.length === 0 ? (
              <div className="p-10 text-center text-gray-500 text-lg">
                No blog posts yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {blogs.map(blog => (
                  <li
                    key={blog.id}
                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {blog.title || "(Untitled)"}
                      </h2>
                      <p className="text-base text-gray-600 mt-1">
                        {blog.date}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingBlog(blog)}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 text-base text-gray-800 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="rounded-xl border border-red-300 px-5 py-2.5 text-base text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Editor */}
        {editingBlog && (
          <BlogForm
            blog={editingBlog}
            onSave={saveBlog}
            onCancel={() => setEditingBlog(null)}
          />
        )}
      </section>
    </main>
  );
}
