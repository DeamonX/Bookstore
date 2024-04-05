"use server";

import { db } from "@/lib/db";
export const getPublishers = async () => {
  try {
    return await db.publisher.findMany();
  } catch {
    return null;
  }
};
export const getPublisherByName = async (publisher_name: string) => {
  try {
    return await db.publisher.findFirst({ where: { publisher_name } });
  } catch {
    return null;
  }
};
