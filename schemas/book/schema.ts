import { BookType } from "@prisma/client";
import { z } from "zod";

export const NewBookSchema = z.object({
  authorId: z.string().min(1, {
    message: "Author is required",
  }),
  publisherId: z.string().min(1, {
    message: "Publisher is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  type: z.nativeEnum(BookType),
  publication_date: z.date().nullable(),
  price: z.number(),
});
