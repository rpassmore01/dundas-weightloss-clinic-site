"use client";

import { useState, useEffect } from "react";

export default function ResourcesAdminPage() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    link: "",
    path: "",
    file: true,     // true=file resource, false=link resource
    client: true,   // true=client, false=professional
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  // same idea as testimonials, but handles radios/checkbox/file carefully
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    // files handled by handleFileChange
    if (type === "file") return;

    // radio values for booleans come in as strings
    if (value === "true" || value === "false") {
      setForm((prev) => ({ ...prev, [name]: value === "true" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] ?? null;
    setSelectedFile(f);

    // optional: show filename in UI
    setForm((prev) => ({ ...prev, path: f ? f.name : "" }));
  };

  const handleSubmit = async () => {
    const method = form.id ? "PUT" : "POST";

    // FILE resource => FormData
    if (form.file) {
      // API requires a file on POST
      if (!form.id && !selectedFile) {
        alert("Please choose a file before adding a file resource.");
        return;
      }

      const fd = new FormData();

      // IMPORTANT for PUT: your API must parse id from FormData
      if (form.id) fd.append("id", String(form.id));

      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("client", String(form.client));
      fd.append("resourceType", "file");

      // only append file if user picked one (PUT can be metadata-only)
      if (selectedFile) fd.append("file", selectedFile);

      const res = await fetch("/api/resources", { method, body: fd });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error ?? "Save failed");
        return;
      }

      setResources(data);
      setForm({
        id: null,
        title: "",
        description: "",
        link: "",
        path: "",
        file: true,
        client: true,
      });
      setSelectedFile(null);
      return;
    }

    // LINK resource => JSON (like testimonials)
    let payload = { ...form };

    if (!form.id) delete payload.id;

    // ensure file fields cleared
    payload.path = "";
    payload.file = false;

    const res = await fetch("/api/resources", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error ?? "Save failed");
      return;
    }

    setResources(data);
    setForm({
      id: null,
      title: "",
      description: "",
      link: "",
      path: "",
      file: true,
      client: true,
    });
    setSelectedFile(null);
  };

  const handleEdit = (resource) => {
    setForm({
      id: resource.id,
      title: resource.title ?? "",
      description: resource.description ?? "",
      link: resource.link ?? "",
      path: resource.path ?? "",
      file: Boolean(resource.file),
      client: Boolean(resource.client),
    });

    // when editing an existing file resource, don't auto-replace file
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/resources", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error ?? "Delete failed");
      return;
    }

    setResources(data);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Resources</h1>

      <div className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="w-full p-2 border rounded"
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        {/* Audience radios */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Audience</h2>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="client"
                value="true"
                checked={form.client === true}
                onChange={handleChange}
              />
              <span>Client</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="client"
                value="false"
                checked={form.client === false}
                onChange={handleChange}
              />
              <span>Professional</span>
            </label>
          </div>
        </div>

        {/* Resource type radios */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Resource Type</h2>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="file"
                value="true"
                checked={form.file === true}
                onChange={(e) => {
                  handleChange(e);
                  // switching to file: clear link
                  setForm((prev) => ({ ...prev, link: "" }));
                }}
              />
              <span>File upload</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="file"
                value="false"
                checked={form.file === false}
                onChange={(e) => {
                  handleChange(e);
                  // switching to link: clear file selection/path
                  setSelectedFile(null);
                  setForm((prev) => ({ ...prev, path: "" }));
                }}
              />
              <span>Link</span>
            </label>
          </div>

          {/* Conditional input */}
          {form.file ? (
            <div className="space-y-2">
              <input
                className="w-full p-2 border rounded"
                type="file"
                onChange={handleFileChange}
              />

              {/* When editing existing file resource, allow viewing current file */}
              {form.id && form.path ? (
                <p className="text-sm text-gray-600">
                  Current file:{" "}
                  <a
                    className="text-sky-700 underline"
                    href={`/api/resources?file=${encodeURIComponent(form.path)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                  {selectedFile ? " (will be replaced)" : ""}
                </p>
              ) : null}
            </div>
          ) : (
            <input
              className="w-full p-2 border rounded"
              type="url"
              name="link"
              placeholder="https://..."
              value={form.link}
              onChange={handleChange}
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        >
          {form.id ? "Update Resource" : "Add Resource"}
        </button>
      </div>

      <ul className="space-y-4">
        {resources.map((r) => (
          <li key={r.id} className="border p-4 rounded shadow-sm">
            <p className="font-semibold">
              {r.title}{" "}
              <span className="text-sm font-normal text-gray-500">
                • {r.client ? "Client" : "Professional"} • {r.file ? "File" : "Link"}
              </span>
            </p>
            <p className="text-sm text-gray-500">{r.description}</p>

            <div className="mt-2">
              {r.file && r.path ? (
                <a
                  className="text-sky-700 underline"
                  href={`/api/resources?file=${encodeURIComponent(r.path)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View file
                </a>
              ) : r.link ? (
                <a
                  className="text-sky-700 underline break-all"
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open link
                </a>
              ) : null}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(r)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
