import { z } from "zod";

export const NewPublisherSchema = z.object({
  publisher_name: z.string().min(1, {
    message: "Publisher is required",
  }),
  publisher_country: z.string().min(1, {
    message: "Publisher's origin is required",
  }),
  date_of_establishment: z.date().nullable(),
});
