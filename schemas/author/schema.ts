import { BookType, COUNTRY, Genders } from "@prisma/client";
import { z } from "zod";

export const NewAuthorSchema = z.object({
  author_first_name: z.string().min(1, {
    message: "Author's first name is required",
  }),
  author_last_name: z.string().optional(),
  gender: z.nativeEnum(Genders),
  dob: z.date().nullable(),
  author_country: z.nativeEnum(COUNTRY).optional(),
  publisherId: z.string().min(1, {
    message: "Publisher is required",
  }),
  favorite_bookId: z.string().optional(),
  favorite_book_category: z.nativeEnum(BookType).optional(),
});
