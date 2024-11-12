// pages/api/verify-recaptcha.ts

import type { NextApiRequest, NextApiResponse } from "next";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();

  if (data.success) {
    return res.status(200).json({ message: "reCAPTCHA verified" });
  } else {
    return res.status(400).json({ message: "reCAPTCHA verification failed" });
  }
}
