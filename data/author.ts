"use server";

import { db } from "@/lib/db";
export const getAuthors = async () => {
  try {
    return await db.author.findMany();
  } catch (e) {
    return null;
  }
};
export const getAuthorsWithPublisher = async () => {
  try {
    return await db.author.findMany({
      include: {
        Publisher: true,
      },
    });
  } catch (e) {
    return null;
  }
};
