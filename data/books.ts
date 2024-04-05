"use server";

import { db } from "@/lib/db";
export const getBooksTable = async () => {
  try {
    return await db.book.findMany({
      include: {
        Author: {
          include: {
            Publisher: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
export const getBookByName = async (title: string) => {
  try {
    return await db.book.findFirst({ where: { title } });
  } catch {
    return null;
  }
};
