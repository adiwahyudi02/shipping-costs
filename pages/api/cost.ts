import type { NextApiRequest, NextApiResponse } from "next";
import { serverFetcher } from "@/utils/fetcher";
import { isAxiosError } from "axios";
import { CostBodyReq } from "@/types/cost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Extract the necessary data from the request body (which will be in JSON format)
      const { origin, destination, weight, courier }: CostBodyReq = req.body;

      // Validate required fields
      if (!origin || !destination || !weight || !courier) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Prepare the payload for the external API
      const payload = {
        origin,
        destination,
        weight,
        courier,
      };

      // Make the request to the external API
      const response = await serverFetcher.post("/cost", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          key: process.env.API_SECRET_KEY,
        },
      });

      // Send the response data back to the client
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
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
