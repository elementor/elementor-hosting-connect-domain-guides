import { z } from "zod";

export const providerSchema = z.object({
  name: z.string(),
  logo: z.string(),
  autoConnect: z.boolean().optional(),
});
