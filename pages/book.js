import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";
import axios from "axios";

export default function Book(props) {
  const form = useRef();
  const [sentMessage, setSentMessage] = useState();
  const [formValidated, setFormValidated] = useState(false);
  const reRef = useRef();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        props.SERVICE_ID,
        props.EMAIL_TEMPLATE_ID,
        form.current,
        props.USER_ID
      )
      .then(
        () => setSentMessage("Message sent successfully!"),
        () => setSentMessage("Message failed, please email directly.")
      );

    document.getElementById("form").reset();
    reRef.current.reset();
    setFormValidated(false);
  }

  async function handleRecaptcha(token) {
    axios
      .post("/api/auth", { token })
      .then((res) => setFormValidated(res.data.human));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Book - Dundas Weight Loss Clinic</title>
        <meta
          name="description"
          content="Contact the Dundas Weight Loss Clinic to make an initial 1 hour free appointment."
        />
      </Head>

      <Navbar />

      <main className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="text-center max-w-2xl mb-10">
          <h1 className="text-4xl font-bold font-serif mb-4">Contact Me!</h1>
          <h2 className="text-lg text-gray-700 font-serif leading-relaxed">
            From here you can let me know a little bit about yourself and what
            you&apos;re looking for. I will get back to you via email to book a
            meeting.
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
                requisky
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
                requisky
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
                requisky
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

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      USER_ID: process.env.USER_ID,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
      SERVICE_ID: process.env.SERVICE_ID,
    },
  };
}
