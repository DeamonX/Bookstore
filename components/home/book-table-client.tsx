"use client";

import { BaseClientProps } from "@/models/components/type";
import { booksTableColumns } from "../table/books/book-table-columns";
import DataTable from "../table/data-table";

export function BookTableClient({ locale }: BaseClientProps) {
  return (
    <DataTable
      columns={booksTableColumns({ locale })}
      data={[
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
        {
          author_name: "Teszt Író",
          authorId: "1",
          condition: "RELIC",
          country: "HU",
          id: "1",
          price: 500,
          publication_date: null,
          publisher_name: "Teszt Kiadó",
          publisherId: "1",
          title: "Teszt Könyv",
          type: "ACTION",
        },
      ]}
    />
  );
}
