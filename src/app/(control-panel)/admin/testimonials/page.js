"use client";

import { useState, useEffect } from "react";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    date: "",
    stars: 5,
    message: "",
  });

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let payload = { ...form };

    let method = "POST";
    if (form.id) {
      method = "PUT";
    } else {
      delete payload.id;
    }

    const res = await fetch("/api/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setTestimonials(data);

    setForm({ id: null, name: "", date: "", stars: 5, message: "" });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial) => {
    setForm(testimonial);
    setEditingTestimonial(testimonial);
  };

  const handleCancel = () => {
    setForm({ id: null, name: "", date: "", stars: 5, message: "" });
    setEditingTestimonial(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setTestimonials(data);
  };

  return (
    <main>
      <section className="w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-sky-900">
              Testimonials Manager
            </h1>
            <p className="text-sky-700 text-sm mt-1">
              Create, edit, and manage testimonials
            </p>
          </div>

          {!editingTestimonial && (
            <button
              onClick={() =>
                setEditingTestimonial({
                  name: "",
                  date: new Date().toISOString().split("T")[0],
                  stars: 5,
                  message: "",
                })
              }
              className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
            >
              + Add Testimonial
            </button>
          )}
        </div>

        {/* Testimonials List */}
        {!editingTestimonial && (
          <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {testimonials.length === 0 ? (
              <div className="p-10 text-center text-gray-500 text-lg">
                No testimonials yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {testimonials.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {t.name || "(No name)"}
                        </h2>
                        <span className="text-amber-500">
                          {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{t.date}</p>
                      <p className="text-gray-600 mt-2 line-clamp-2">{t.message}</p>
                    </div>

                    <div className="flex gap-3 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(t)}
                        className="rounded-xl border border-gray-300 px-5 py-2.5 text-base text-gray-800 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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
        {editingTestimonial && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-semibold text-sky-900">
              {form.id ? "Edit Testimonial" : "New Testimonial"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                  type="text"
                  name="name"
                  placeholder="Customer name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                    name="stars"
                    value={form.stars}
                    onChange={handleChange}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Star{n > 1 ? "s" : ""} {"★".repeat(n)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition min-h-30"
                  name="message"
                  placeholder="Testimonial message..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 transition"
              >
                {form.id ? "Update Testimonial" : "Add Testimonial"}
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
