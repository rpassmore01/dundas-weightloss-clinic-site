"use client";

import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default function BlogForm({ blog, onSave, onCancel }) {
  const isNew = !blog?.id;

  const [title, setTitle] = useState(blog?.title || "");
  const [body, setBody] = useState(blog?.body || "");
  const [date, setDate] = useState(
    blog?.date || new Date().toISOString().split("T")[0]
  );

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isNew ? "Create Blog Post" : "Edit Blog Post"}
        </h2>
      </div>

      {/* Title */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-2">
          Title
        </label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Enter blog title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      {/* Date */}
      <div className="max-w-sm">
        <label className="block text-base font-medium text-gray-900 mb-2">
          Publish Date
        </label>
        <input
          type="date"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-base font-medium text-gray-900 mb-3">
          Content
        </label>
        <RichTextEditor value={body} onChange={setBody} />
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-6">
        <button
          onClick={() => onSave({ title, body, date })}
          className="rounded-xl bg-sky-600 px-8 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
        >
          {isNew ? "Create Post" : "Save Changes"}
        </button>

        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-300 px-8 py-3 text-gray-800 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
