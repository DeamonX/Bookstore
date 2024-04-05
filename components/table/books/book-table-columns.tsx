"use client";
import { ColumnDef } from "@tanstack/react-table";
import TextWithFilterTableColumn from "../column-components/text-with-filter-column";
import ActionsTableColumn from "../column-components/actions-column";
import { BaseClientProps } from "@/models/components/type";
import { BookTableModel } from "@/components/book/book-table-client";

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
      id: locale.type,
      accessorKey: "type",
      sortingButtonState: {
        text: locale.type,
      },
    }),

    TextWithFilterTableColumn<BookTableModel>({
      id: locale.author_first_name,
      accessorKey: "Author.author_first_name",
      sortingButtonState: {
        text: locale.author_first_name,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.author_last_name,
      accessorKey: "Author.author_last_name",
      sortingButtonState: {
        text: locale.author_last_name,
      },
    }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.publisher_name,
      accessorKey: "Author.Publisher.publisher_name",
      sortingButtonState: {
        text: locale.publisher_name,
      },
    }),
    // TextWithFilterTableColumn<BookTableModel>({
    //   id: locale.publication_date,
    //   accessorKey: "publication_date",
    //   sortingButtonState: {
    //     text: locale.publication_date,
    //   },
    // }),
    TextWithFilterTableColumn<BookTableModel>({
      id: locale.price,
      accessorKey: "price",
      sortingButtonState: {
        text: locale.price,
      },
    }),
    // TextWithFilterTableColumn<BookTableModel>({
    //   id: locale.country,
    //   accessorKey: "author_country",
    //   sortingButtonState: {
    //     text: locale.country,
    //   },
    // }),
  ];
}
