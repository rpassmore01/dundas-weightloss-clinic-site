"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateVisitorId() {
  // Generate a unique visitor ID and store in localStorage
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 32; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function getVisitorId() {
  if (typeof window === "undefined") return null;

  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    const visitorId = getVisitorId();
    if (!visitorId) return;

    // Track the page view - server will deduplicate per visitor per page
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: pathname,
        visitorId,
        referrer: document.referrer || null,
      }),
    }).catch((err) => {
      // Silently fail - analytics should not break the site
      console.error("Analytics tracking failed:", err);
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
