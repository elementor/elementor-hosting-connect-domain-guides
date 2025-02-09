import { z } from "zod";

const visualSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
});

const introStepSchema = z.object({
  dashboardUrl: z.string(),
  visual: visualSchema.optional(),
});

const dnsStepSchema = z.object({
  visual: visualSchema.optional(),
  instructions: z.array(z.string()),
});

export const guideSchema = z.object({
  version: z.string(),
  steps: z.object({
    intro: introStepSchema,
    dns: dnsStepSchema,
  }),
});
