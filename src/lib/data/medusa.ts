import Medusa from "@medusajs/medusa-js";

export const client = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_API_URL || "http://localhost:9000",
  maxRetries: 3,
});
