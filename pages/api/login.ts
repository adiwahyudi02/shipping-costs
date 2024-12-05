import { User } from "@/types/user";
import type { NextApiRequest, NextApiResponse } from "next";

// Dummy fixed username and password
const FIXED_USERNAME = "username";
const FIXED_PASSWORD = "password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password }: User = req.body;

    if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
      return res.status(200).json({
        username: FIXED_USERNAME,
        password: FIXED_PASSWORD,
      });
    } else {
      // If credentials don't match, return an error
      return res.status(401).json({ message: "Invalid username or password" });
    }
  }

  // If the request method is not POST, return a 405 error (Method Not Allowed)
  return res.status(405).json({ message: "Method Not Allowed" });
}
