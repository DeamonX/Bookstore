"use server";

import { db } from "@/lib/db";
export const getAuthors = async () => {
  try {
    return await db.author.findMany();
  } catch {
    return null;
  }
};