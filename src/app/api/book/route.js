import axios from "axios";
import emailjs from "@emailjs/nodejs";

export async function POST(request) {
  try {
    const { formData, token } = await request.json();

    // 1. Verify captcha
    const captchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_SITE_KEY}&response=${token}`
    );

    if (!captchaRes.data.success) {
      return Response.json({ success: false, error: "Captcha failed" }, { status: 400 });
    }

    // 2. Send email using server secrets
    const result = await emailjs.send(
      process.env.SERVICE_ID,
      process.env.EMAIL_TEMPLATE_ID,
      formData,
      { publicKey: process.env.USER_ID }
    );

    return Response.json({ success: true, result }, { status: 200 });
  } catch (err) {
    console.error("Email API error:", err);
    return Response.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
