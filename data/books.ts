"use server";

import { BookTableModel } from "@/components/book/book-table-client";
import { db } from "@/lib/db";
export const getBooksTable = async () => {
  try {
    return (await db.book.findMany({
      include: {
        Author: {
          include: {
            Publisher: true,
          },
        },
      },
    })) as BookTableModel[];
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
