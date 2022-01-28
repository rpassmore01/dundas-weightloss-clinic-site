export default async function handler(req, res) {
  if (req.method === "POST") {
    const human = await validateHuman(req.body);
    if (!human) {
      res.status(400);
      res.json({ human: false });
      return;
    }
    res.status(201);
    res.json({ human: true });
  }

  async function validateHuman(token) {
    const secret = process.env.SECRET_SITE_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    return data.success;
  }
}
