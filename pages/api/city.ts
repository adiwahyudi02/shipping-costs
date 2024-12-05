import type { NextApiRequest, NextApiResponse } from "next";
import { serverFetcher } from "@/utils/fetcher";
import { isAxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { province } = req.query;
    const response = await serverFetcher.get("/city", {
      headers: {
        key: process.env.API_SECRET_KEY,
      },
      params: {
        ...(province && { province }),
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
