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
  return (
    <DataTable
      columns={booksTableColumns({ locale })}
      data={books}
      // {
      //   publisher_country: "HU",
      //   dob: null,
      //   favorite_book_category: "ADVENTURE",
      //   date_of_establishment: null,
      //   favorite_bookId: "1",
      //   author_first_name: "Teszt",
      //   author_country: "HU",
      //   gender: "MALE",
      //   author_last_name: "Elek",
      //   id: "1",
      //   authorId: "1",
      //   price: 100,
      //   publication_date: null,
      //   publisher_name: "Teszt Kiadó",
      //   publisherId: "1",
      //   title: "Teszt Könyv",
      //   type: "ACTION",
      // },
    />
  );
}
