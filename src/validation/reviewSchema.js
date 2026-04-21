import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),

  comment: z.string().min(5, "Comment must be at least 5 characters"),
});