"use client";

import DataTable from "../table/data-table";
import { publisherTableColumns } from "../table/publishers/publisher-table-columns";
import { Publisher } from "@prisma/client";

type PublisherTableClientModel = {
  publishers: Publisher[];
  locale: Record<string, string>;
};

export function PublisherTableClient({
  publishers,
  locale,
}: PublisherTableClientModel) {
  return (
    <DataTable columns={publisherTableColumns({ locale })} data={publishers} />
  );
}
