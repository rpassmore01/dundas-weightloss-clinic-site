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
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="text-center max-w-2xl mb-10">
          <h1 className="text-4xl font-bold font-serif mb-4">Contact Me!</h1>
          <h2 className="text-lg text-gray-700 font-serif leading-relaxed">
            Let me know a little bit about yourself and what you&apos;re
            looking for. I&apos;ll get back to you via email to book a meeting.
          </h2>
        </div>

        <div className="w-full max-w-2xl bg-gray-200 rounded-xl shadow-lg p-8">
          <form
            ref={form}
            onSubmit={sendEmail}
            id="form"
            className="flex flex-col space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Name <span className="text-sky-600">*</span>
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-sky-600 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Email <span className="text-sky-600">*</span>
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-sky-600 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Phone number <span className="text-sky-600">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-sky-600 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Message (optional)
              </label>
              <textarea
                name="message"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:ring-2 focus:ring-sky-600 focus:outline-none resize-y"
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
                className={`px-6 py-3 rounded-lg text-lg font-semibold shadow transition transform ${
                  formValidated
                    ? "bg-sky-600 text-white hover:bg-sky-700 hover:-translate-y-1"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>

            {/* Feedback */}
            {sentMessage && (
              <p className="text-center text-lg font-medium mt-4">
                {sentMessage}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
