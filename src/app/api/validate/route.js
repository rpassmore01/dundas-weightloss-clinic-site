import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();
    const human = await validateHuman(body);

    if (!human) {
      return Response.json({ human: false }, { status: 400 });
    }

    return Response.json({ human: true }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

async function validateHuman(token) {
  const secret = process.env.SECRET_SITE_KEY;

  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token.token}`
    );
    return res.data.success;
  } catch (err) {
    console.error("Recaptcha validation failed:", err);
    return false;
  }
}
