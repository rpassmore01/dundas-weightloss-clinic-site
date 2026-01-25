// lib/auth.js
import { cookies } from "next/headers";
import { createHmac } from "crypto";

const AUTH_COOKIE_NAME = "auth_session";
const SESSION_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Generate a signed session token
 * Format: timestamp.signature
 */
function generateSessionToken() {
  const timestamp = Date.now().toString();
  const secret = process.env.TOTP_SECRET || "fallback-secret-change-me";
  const signature = createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verify a session token and check if it's expired
 */
function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const secret = process.env.TOTP_SECRET || "fallback-secret-change-me";

  // Verify signature
  const expectedSignature = createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");

  if (signature !== expectedSignature) return false;

  // Check if session is expired
  const sessionTime = parseInt(timestamp, 10);
  if (isNaN(sessionTime)) return false;

  const now = Date.now();
  return now - sessionTime <= SESSION_DURATION;
}

/**
 * Check if the current request is authenticated
 * Use this in API routes and server components
 */
export async function isAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);

  if (!sessionCookie?.value) return false;

  return verifySessionToken(sessionCookie.value);
}


/**
 * Create a session cookie value and options
 * Returns { value, options } to be used with Set-Cookie
 */
export function createSession() {
  const token = generateSessionToken();
  const isProduction = process.env.NODE_ENV === "production";

  return {
    name: AUTH_COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_DURATION / 1000), // in seconds
    },
  };
}

/**
 * Create options for clearing the session cookie
 */
export function clearSession() {
  return {
    name: AUTH_COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    },
  };
}

/**
 * Get the auth cookie name (for use in layouts/middleware)
 */
export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}
