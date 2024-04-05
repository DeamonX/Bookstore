"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Author } from "@prisma/client";
import TextWithFilterTableColumn from "../column-components/text-with-filter-column";
import ActionsTableColumn from "../column-components/actions-column";
import { BaseClientProps } from "@/models/components/type";
import DateWithFilterTableColumn from "../column-components/date-with-filter-column";

export function authorTableColumns({
  locale,
}: BaseClientProps): ColumnDef<Author>[] {
  return [
    ActionsTableColumn<Author>({
      id: "actions",
      accessorKey: "",
      details: false,
      expand: false,
      select: true,
    }),
    TextWithFilterTableColumn<Author>({
      id: locale.author_first_name,
      accessorKey: "author_first_name",
      sortingButtonState: {
        text: locale.author_first_name,
      },
    }),
    TextWithFilterTableColumn<Author>({
      id: locale.author_last_name,
      accessorKey: "author_last_name",
      sortingButtonState: {
        text: locale.author_last_name,
      },
    }),
    TextWithFilterTableColumn<Author>({
      id: locale.gender,
      accessorKey: "gender",
      sortingButtonState: {
        text: locale.gender,
      },
    }),
    TextWithFilterTableColumn<Author>({
      id: locale.author_country,
      accessorKey: "author_country",
      sortingButtonState: {
        text: locale.author_country,
      },
    }),
    DateWithFilterTableColumn<Author>({
      id: locale.dob,
      accessorKey: "dob",
      sortingButtonState: {
        text: locale.dob,
      },
    }),
    TextWithFilterTableColumn<Author>({
      id: locale.favorite_book_category,
      accessorKey: "favorite_book_category",
      sortingButtonState: {
        text: locale.favorite_book_category,
      },
    }),
  ];
}
