import type { NextApiRequest, NextApiResponse } from "next";
import { serverFetcher } from "@/utils/fetcher";
import { isAxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await serverFetcher.get("/province", {
      headers: {
        key: process.env.API_SECRET_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // Handle Axios-specific error
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
      });
    } else {
      // Handle unexpected error type
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
