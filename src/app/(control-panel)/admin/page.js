"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faChartLine, faEye, faUsers, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ControlHomePage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupMessage, setBackupMessage] = useState("");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setAnalytics(data))
      .catch(() => setAnalytics(null));
  }, []);

  const handleBackup = async () => {
    setIsBackingUp(true);
    setBackupMessage("");

    try {
      const response = await fetch("/api/backup");

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Backup failed");
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "backup.zip";

      // Create a blob from the response and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setBackupMessage("Backup created and downloaded successfully!");
    } catch (error) {
      setBackupMessage(`Error: ${error.message}`);
    } finally {
      setIsBackingUp(false);
    }
  };

  return (
    <main>
      <section className="w-full space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-sky-900">
            Welcome to the Control Panel
          </h1>
          <p className="text-sky-700 text-sm mt-1">
            Manage your clinic&apos;s content and data
          </p>
        </div>

        {/* Widgets Row - Side by side on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Analytics Summary Widget */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 w-full md:w-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="text-lg font-medium text-sky-900">Today&apos;s Stats</h3>
            </div>

            {analytics ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <FontAwesomeIcon icon={faEye} className="h-4 w-4 text-sky-600" />
                      <span className="text-xs text-sky-700">Page Views</span>
                    </div>
                    <p className="text-2xl font-semibold text-sky-900">
                      {analytics.overview?.todayViews?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-700">New Visitors</span>
                    </div>
                    <p className="text-2xl font-semibold text-green-900">
                      {analytics.overview?.todayVisitors?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/analytics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white text-sm font-medium hover:bg-sky-700 transition"
                >
                  View Full Analytics
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm mb-4">Loading analytics...</p>
                <Link
                  href="/admin/analytics"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white text-sm font-medium hover:bg-sky-700 transition"
                >
                  View Analytics
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Data Management Widget */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 w-full md:w-auto md:max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faDownload} className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="text-lg font-medium text-sky-900">Create Backup</h3>
            </div>

            <p className="text-gray-500 text-sm mb-5">
              Download a zip file containing all data files (blogs, resources, testimonials).
              A copy will also be saved to the server&apos;s backups folder.
            </p>

            <button
              onClick={handleBackup}
              disabled={isBackingUp}
              className="rounded-xl bg-sky-600 px-5 py-3 text-white text-sm font-medium hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition"
            >
              {isBackingUp ? "Creating Backup..." : "Download Backup"}
            </button>

            {backupMessage && (
              <p
                className={`mt-4 text-sm ${
                  backupMessage.startsWith("Error")
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {backupMessage}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
