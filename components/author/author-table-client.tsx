"use client";

import { BaseClientProps } from "@/models/components/type";
import DataTable from "../table/data-table";
import { authorTableColumns } from "../table/authors/author-table-columns";

export function AuthorTableClient({ locale }: BaseClientProps) {
  return (
    <DataTable
      columns={authorTableColumns({ locale })}
      data={[
        {
          author_country: "HU",
          dob: null,
          favorite_book_category: "ADVENTURE",
          favorite_bookId: "1",
          author_first_name: "Teszt",
          gender: "MALE",
          author_last_name: "Elek",
          publisherId: "1",
          id: "1",
        },
      ]}
    />
  );
}
