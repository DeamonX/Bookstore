import { COUNTRY } from "@prisma/client";
import { z } from "zod";

export const NewPublisherSchema = z.object({
  publisher_name: z.string().min(1, {
    message: "Publisher is required",
  }),
  publisher_country: z.nativeEnum(COUNTRY),
  date_of_establishment: z.date().nullable(),
});
