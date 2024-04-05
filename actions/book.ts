"use server";

import { getBookByName } from "@/data/books";
import { db } from "@/lib/db";
import { NewBookSchema } from "@/schemas/book/schema";
import { z } from "zod";

export default async function addBook(values: z.infer<typeof NewBookSchema>) {
  const validatedFields = NewBookSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const existingBook = await getBookByName(validatedFields.data.title);
  console.log(existingBook);
  if (existingBook) {
    return { error: "Book with this title already exists!" };
  }

  await db.book.create({
    data: validatedFields.data,
  });

  return { success: "Success" };
}
