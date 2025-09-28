"use client";

import { useState, useEffect } from "react";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState([]);
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
  };

  const handleEdit = (testimonial) => {
    setForm(testimonial);
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    setTestimonials(data);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>

      <div className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <select
          className="w-full p-2 border rounded"
          name="stars"
          value={form.stars}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <textarea
          className="w-full p-2 border rounded"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {form.id ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </div>

      <ul className="space-y-4">
        {testimonials.map((t) => (
          <li key={t.id} className="border p-4 rounded shadow-sm">
            <p className="font-semibold">
              {t.name} - {t.stars}⭐
            </p>
            <p className="text-sm text-gray-500">{t.date}</p>
            <p>{t.message}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(t)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
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
