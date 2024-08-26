import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/database";
import Email from "../../lib/schema";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB();

  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const newEmail = new Email({ email });
      await newEmail.save();
      res.status(201).json({ message: "Email saved successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
