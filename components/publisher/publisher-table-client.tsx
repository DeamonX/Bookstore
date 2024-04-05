"use client";

import { BaseClientProps } from "@/models/components/type";
import DataTable from "../table/data-table";
import { publisherTableColumns } from "../table/publishers/publisher-table-columns";

export function PublisherTableClient({ locale }: BaseClientProps) {
  return (
    <DataTable
      columns={publisherTableColumns({ locale })}
      data={[
        {
          date_of_establishment: null,
          publisher_country: "HU",
          publisher_name: "Teszt kiadó",
          id: "1",
        },
        {
          date_of_establishment: null,
          publisher_country: "HU",
          publisher_name: "Teszt kiadó2",
          id: "2",
        },
      ]}
    />
  );
}
