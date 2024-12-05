import axios from "axios";

/**
 * serverFetcher:
 * - Sends requests to external APIs (e.g., RajaOngkir).
 * - Used in server-side code like `/pages/api`.
 */
export const serverFetcher = axios.create({
  baseURL: "https://api.rajaongkir.com/starter",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * clientFetcher:
 * - Sends requests to internal API routes (`/api`).
 * - Used on the client-side to fetch data from Next.js API routes.
 */
export const clientFetcher = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
