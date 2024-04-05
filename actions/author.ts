"use server";

import { db } from "@/lib/db";
import { NewAuthorSchema } from "@/schemas/author/schema";
import { z } from "zod";

export default async function addAuhtor(
  values: z.infer<typeof NewAuthorSchema>
) {
  const validatedFields = NewAuthorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await db.author.create({
    data: validatedFields.data,
  });

  return { success: "Success" };
}
