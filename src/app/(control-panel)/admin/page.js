"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function ControlHomePage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupMessage, setBackupMessage] = useState("");

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
      <section className="w-full px-6 py-12 space-y-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-sky-900">
            Welcome to the Control Panel
          </h1>
          <p className="text-sky-700 text-sm mt-1">
            Manage your clinic&apos;s content and data
          </p>
        </div>

        {/* Data Management Section */}
        <div>
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Data Management</h2>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 max-w-md">
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
