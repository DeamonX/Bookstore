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
    return { error: "invalid_fields" };
  }
  const { publisher_name } = validatedFields.data;

  const existingPublisher = await getPublisherByName(publisher_name);

  if (existingPublisher) {
    return { error: "name_exists" };
  }

  await db.publisher.create({
    data: validatedFields.data,
  });

  return { success: "add_success" };
}
