import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  location: z.string().min(1, "Location is required"),
  country: z.string().min(1, "Country is required"),
  image: z
  .any()
  .refine((file) => file?.length > 0, "Image is required"),
});
