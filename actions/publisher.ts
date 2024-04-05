"use server";

import { getPublisherByName } from "@/data/publisher";
import { db } from "@/lib/db";
import { NewPublisherSchema } from "@/schemas/publisher/schema";
import { z } from "zod";

export default async function addPublisher(
  values: z.infer<typeof NewPublisherSchema>
) {
  const validatedFields = NewPublisherSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { publisher_name } = validatedFields.data;

  const existingPublisher = await getPublisherByName(publisher_name);

  if (existingPublisher) {
    return { error: "There is already a publisher with this name!" };
  }

  await db.publisher.create({
    data: validatedFields.data,
  });

  return { success: "Success" };
}
