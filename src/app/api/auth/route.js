import speakeasy from "speakeasy";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { createSession, clearSession } from "../../../lib/auth";

export async function POST(req) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const token = params.get("token");
  const returnTo = params.get("returnTo") || "/admin";

  const verified = speakeasy.totp.verify({
    secret: process.env.TOTP_SECRET,
    encoding: "base32",
    token,
    window: 1,
  });

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