import { ColumnDef } from "@tanstack/react-table";
import { ColumnTextModel } from "../types/column-types";
import SortingFilterHeader from "./headers/sorting-filter-header";

export default function TextWithFilterTableColumn<T>({
  id,
  accessorKey,
  sortingButtonState,
  filterInputState,
}: ColumnTextModel): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    // filterFn: "textFilter",
    header: ({ header, column, table }) => (
      <SortingFilterHeader
        header={header}
        column={column}
        table={table}
        sortingButtonState={{ sortingButtonState }}
        filterInputState={{ filterInputState }}
      />
    ),
    cell: ({ cell }) => {
      return (
        <span>
          {cell.getValue() === null ? "" : (cell.getValue() as string)}
        </span>
      );
    },
  };
}
