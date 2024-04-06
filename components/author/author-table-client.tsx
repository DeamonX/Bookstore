"use client";

import DataTable from "../table/data-table";
import { authorTableColumns } from "../table/authors/author-table-columns";
import { Author } from "@prisma/client";

type AuthorTableClientModel = {
  authors: Author[];
  locale: Record<string, string>;
};

export function AuthorTableClient({ authors, locale }: AuthorTableClientModel) {
  console.log(authors);
  return <DataTable columns={authorTableColumns({ locale })} data={authors} />;
}
