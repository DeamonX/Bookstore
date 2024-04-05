"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Publisher } from "@prisma/client";
import TextWithFilterTableColumn from "../column-components/text-with-filter-column";
import ActionsTableColumn from "../column-components/actions-column";
import { BaseClientProps } from "@/models/components/type";
import DateWithFilterTableColumn from "../column-components/date-with-filter-column";

export function publisherTableColumns({
  locale,
}: BaseClientProps): ColumnDef<Publisher>[] {
  return [
    ActionsTableColumn<Publisher>({
      id: "actions",
      accessorKey: "",
      details: false,
      expand: false,
      select: true,
    }),
    TextWithFilterTableColumn<Publisher>({
      id: locale.publisher_name,
      accessorKey: "publisher_name",
      sortingButtonState: {
        text: locale.publisher_name,
      },
    }),
    TextWithFilterTableColumn<Publisher>({
      id: locale.publisher_country,
      accessorKey: "publisher_country",
      sortingButtonState: {
        text: locale.publisher_country,
      },
    }),
    DateWithFilterTableColumn<Publisher>({
      id: locale.date_of_establishment,
      accessorKey: "date_of_establishment",
      sortingButtonState: {
        text: locale.date_of_establishment,
      },
    }),
  ];
}
