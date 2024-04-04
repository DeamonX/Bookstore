"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Author, Book, Publisher } from "@prisma/client";
import TextWithFilterTableColumn from "../column-components/text-with-filter-column";
import ActionsTableColumn from "../column-components/actions-column";
import { BaseClientProps } from "@/models/components/type";

export type BookTableModel = Book & Author & Publisher;

export function booksTableColumns({
  locale,
}: BaseClientProps): ColumnDef<BookTableModel>[] {
  return [
    ActionsTableColumn<BookTableModel>({
      id: "actions",
      accessorKey: "",
      details: false,
      expand: true,
      select: true,
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.title,
      accessorKey: "title",
      sortingButtonState: {
        text: locale.title,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.publication_date,
      accessorKey: "publication_date",
      sortingButtonState: {
        text: locale.publication_date,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.price,
      accessorKey: "price",
      sortingButtonState: {
        text: locale.price,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.condition,
      accessorKey: "condition",
      sortingButtonState: {
        text: locale.condition,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.publisher_name,
      accessorKey: "publisher_name",
      sortingButtonState: {
        text: locale.publisher_name,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.country,
      accessorKey: "country",
      sortingButtonState: {
        text: locale.country,
      },
    }),
  ];
}
