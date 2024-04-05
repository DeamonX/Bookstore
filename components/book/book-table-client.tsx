"use client";

import { booksTableColumns } from "../table/books/book-table-columns";
import DataTable from "../table/data-table";
import { Author, Book, Publisher } from "@prisma/client";

export type BookTableModel = Book & {
  Author: Author & {
    Publisher: Publisher;
  };
};

type BookTableClientModel = {
  books: BookTableModel[];
  locale: Record<string, string>;
};

export function BookTableClient({ books, locale }: BookTableClientModel) {
  return <DataTable columns={booksTableColumns({ locale })} data={books} />;
}
