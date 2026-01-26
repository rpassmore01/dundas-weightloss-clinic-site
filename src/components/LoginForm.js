"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCircleExclamation, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token,
          returnTo: "/admin",
        }),
        redirect: "manual",
      });

      if (res.type === "opaqueredirect" || res.status === 0 || res.redirected) {
        // Successful login - redirect happened
        router.refresh();
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Control Panel</h1>
          <p className="text-gray-500 mt-1">Enter your authentication code to continue</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Code
              </label>
              <input
                type="text"
                id="token"
                name="token"
                value={token}
                onChange={(e) => {
                  // Only allow digits and limit to 6 characters
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setToken(value);
                  setError("");
                }}
                placeholder="000000"
                maxLength={6}
                autoComplete="one-time-code"
                inputMode="numeric"
                className={`w-full px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] border rounded-xl focus:outline-none focus:ring-2 transition ${
                  error 
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                    : "border-gray-300 focus:ring-sky-500 focus:border-sky-500"
                }`}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={token.length !== 6 || isLoading}
              className="w-full rounded-xl bg-sky-600 px-5 py-3 text-white font-medium hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Dundas Weight Loss Clinic
        </p>
      </div>
    </div>
  );
}
