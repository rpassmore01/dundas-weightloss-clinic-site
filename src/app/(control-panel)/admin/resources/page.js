"use client";

import { useState, useEffect } from "react";

export default function ResourcesAdminPage() {
  const [resources, setResources] = useState([]);
  const [editingResource, setEditingResource] = useState(null);
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
      setEditingResource(null);
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
    setEditingResource(null);
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
    setEditingResource(resource);

    // when editing an existing file resource, don't auto-replace file
    setSelectedFile(null);
  };

  const handleCancel = () => {
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
    setEditingResource(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this resource?")) return;
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
    <main>
      <section className="w-full px-6 py-12 space-y-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-sky-900">
              Resources Manager
            </h1>
            <p className="text-sky-700 text-sm mt-1">
              Create, edit, and manage resources for patients and professionals
            </p>
          </div>

          {!editingResource && (
            <button
              onClick={() => {
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
                setEditingResource({ isNew: true });
              }}
              className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
            >
              + Add Resource
            </button>
          )}
        </div>

        {/* Resources List */}
        {!editingResource && (
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {resources.length === 0 ? (
              <div className="p-10 text-center text-gray-500 text-lg">
                No resources yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {resources.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {r.title || "(Untitled)"}
                        </h2>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${r.client ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                          {r.client ? "Patient" : "Professional"}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${r.file ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                          {r.file ? "File" : "Link"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{r.description}</p>
                      <div className="mt-2">
                        {r.file && r.path ? (
                          <a
                            className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                            href={`/api/resources?file=${encodeURIComponent(r.path)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View file →
                          </a>
                        ) : r.link ? (
                          <a
                            className="text-sky-600 hover:text-sky-700 text-sm font-medium break-all"
                            href={r.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Open link →
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-3 ml-4 shrink-0">
                      <button
                        onClick={() => handleEdit(r)}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 text-base text-gray-800 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
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

        {/* Editor Form */}
        {editingResource && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-semibold text-sky-900">
              {form.id ? "Edit Resource" : "New Resource"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  type="text"
                  name="title"
                  placeholder="Resource title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  type="text"
                  name="description"
                  placeholder="Brief description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Audience Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition ${form.client === true ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="client"
                      value="true"
                      checked={form.client === true}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-medium">Patient</span>
                  </label>

                  <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition ${form.client === false ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="client"
                      value="false"
                      checked={form.client === false}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-medium">Professional</span>
                  </label>
                </div>
              </div>

              {/* Resource Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition ${form.file === true ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="file"
                      value="true"
                      checked={form.file === true}
                      onChange={(e) => {
                        handleChange(e);
                        setForm((prev) => ({ ...prev, link: "" }));
                      }}
                      className="sr-only"
                    />
                    <span className="font-medium">File Upload</span>
                  </label>

                  <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition ${form.file === false ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="file"
                      value="false"
                      checked={form.file === false}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedFile(null);
                        setForm((prev) => ({ ...prev, path: "" }));
                      }}
                      className="sr-only"
                    />
                    <span className="font-medium">External Link</span>
                  </label>
                </div>
              </div>

              {/* Conditional Input */}
              {form.file ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-sky-400 transition">
                    <input
                      className="w-full"
                      type="file"
                      onChange={handleFileChange}
                    />
                    {form.id && form.path && (
                      <p className="text-sm text-gray-500 mt-2">
                        Current file:{" "}
                        <a
                          className="text-sky-600 hover:text-sky-700 font-medium"
                          href={`/api/resources?file=${encodeURIComponent(form.path)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                        {selectedFile ? " (will be replaced)" : ""}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    type="url"
                    name="link"
                    placeholder="https://..."
                    value={form.link}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
              >
                {form.id ? "Update Resource" : "Add Resource"}
              </button>
              <button
                onClick={handleCancel}
                className="rounded-xl border border-gray-300 px-5 py-3 text-base text-gray-800 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
