import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const human = await validateHuman(req.body);
    if (!human) {
      return res.status(400).json({ human: false });
    } else {
      return res.status(201).json({ human: true });
    }
  }

  async function validateHuman(token) {
    const secret = process.env.SECRET_SITE_KEY;
    let response;
    await axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token.token}`
      )
      .then((res) => {
        response = res.data.success;
      });
    return response;
  }
}
