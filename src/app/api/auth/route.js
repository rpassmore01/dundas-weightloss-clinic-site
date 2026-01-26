import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { createSession, clearSession } from "../../../lib/auth";

// Base32 decode function
function base32Decode(encoded) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  const sanitized = encoded.toUpperCase().replace(/=+$/, "");

  for (const char of sanitized) {
    const val = alphabet.indexOf(char);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }

  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }

  return Buffer.from(bytes);
}

// Generate TOTP code for a given time
function generateTOTP(secret, time) {
  const counter = Math.floor(time / 30);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter));

  const key = base32Decode(secret);
  const hmac = createHmac("sha1", key).update(counterBuffer).digest();

  const offset = hmac[hmac.length - 1] & 0x0f;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000;

  return code.toString().padStart(6, "0");
}

// Verify TOTP with window
function verifyTOTP(token, secret, window = 1) {
  const now = Math.floor(Date.now() / 1000);

  for (let i = -window; i <= window; i++) {
    const time = now + (i * 30);
    if (generateTOTP(secret, time) === token) {
      return true;
    }
  }

  return false;
}

export async function POST(req) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const token = params.get("token");
  const returnTo = params.get("returnTo") || "/admin";

  // In test mode, accept "000000" as valid password
  const isTestMode = process.env.TEST_MODE === "true";
  const verified = isTestMode && token === "000000"
    ? true
    : verifyTOTP(token, process.env.TOTP_SECRET);

  if (!verified) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  const { origin } = new URL(req.url);
  const redirectUrl = new URL(returnTo, origin);
  const res = NextResponse.redirect(redirectUrl);

  const session = createSession();
  res.headers.set(
    "Set-Cookie",
    serialize(session.name, session.value, session.options)
  );

  return res;
}

export async function DELETE() {
  // Logout endpoint
  const session = clearSession();
  const res = NextResponse.json({ success: true });

  res.headers.set(
    "Set-Cookie",
    serialize(session.name, session.value, session.options)
  );

  return res;
}