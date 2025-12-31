"use client";

import { useRef, useState } from "react";

export default function CopyButton({
  text,
  label = "Copy",
  toastMessage = "Copied to clipboard!",
  className = "inline-flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition",
}) {
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      // show toast
      setShowToast(true);

      // reset timer (so repeated clicks keep it visible)
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowToast(false), 1500);
    } catch (err) {
      console.error(err);
      // optional: you can show a different toast here instead of alert
      alert("Copy failed (clipboard access blocked).");
    }
  };

  return (
    <>
      <button type="button" onClick={handleCopy} className={className}>
        {label}
      </button>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed top-5 right-5 z-50 transition-all duration-200 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-lg bg-gray-900 text-white px-4 py-3 shadow-lg text-sm">
          {toastMessage}
        </div>
      </div>
    </>
  );
}
