"use client";

import { useState, useEffect } from "react";

export default function ClosingBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("closingBannerDismissed")) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("closingBannerDismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition text-2xl leading-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Important Notice</h2>
        <p className="text-gray-700 leading-relaxed">
          Dundas Weight Loss Clinic will no longer be accepting new patients as of{" "}
          <span className="font-semibold">April 1st, 2026</span>. All new consults will be
          sent to{" "}
          <span className="font-semibold">Wave Metabolics</span>.
        </p>
        <button
          onClick={dismiss}
          className="mt-6 w-full rounded-xl bg-sky-600 px-5 py-2.5 text-md font-semibold text-white transition hover:bg-sky-700"
        >
          I understand
        </button>
      </div>
    </div>
  );
}
