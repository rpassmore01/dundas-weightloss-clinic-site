"use client";

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function BookPage() {
  const form = useRef();
  const [sentMessage, setSentMessage] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const reRef = useRef();
  const [captchaToken, setCaptchaToken] = useState(null);

  async function sendEmail(e) {
    e.preventDefault();

    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      phone_number: form.current.phone_number.value,
      message: form.current.message.value,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, token: captchaToken }),
      });

      const data = await res.json();
      setSentMessage(data.success ? "Message sent successfully!" : data.error);

      // reset form + captcha
      form.current.reset();
      reRef.current.reset();
      setFormValidated(false);
      setCaptchaToken(null);
    } catch {
      setSentMessage("Server error, please try again later.");
    }
  }

  function handleRecaptcha(token) {
    setCaptchaToken(token);
    setFormValidated(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <main className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Header */}
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Contact Me
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Share a little bit about yourself and what you&apos;re looking for. I
            will follow up by email to book a meeting.
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          <form
            ref={form}
            onSubmit={sendEmail}
            id="form"
            className="flex flex-col space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-sky-600">*</span>
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sky-600 focus:border-sky-600 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-sky-600">*</span>
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sky-600 focus:border-sky-600 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone number <span className="text-sky-600">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sky-600 focus:border-sky-600 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sky-600 focus:border-sky-600 focus:outline-none resize-y"
              />
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
                onChange={handleRecaptcha}
                ref={reRef}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!formValidated}
                className={`px-8 py-3 rounded-lg text-base font-semibold shadow-lg transition-transform duration-200 ${
                  formValidated
                    ? "bg-sky-600 text-white hover:bg-sky-700 hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>

            {/* Feedback */}
            {sentMessage && (
              <p className="text-center text-base font-medium mt-6 text-gray-700">
                {sentMessage}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
