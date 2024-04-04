import { ColumnDef } from "@tanstack/react-table";
import { ColumnTextModel } from "../types/column-types";
import SortingFilterHeader from "./headers/sorting-filter-header";

export default function TextWithFilterTableColumn<T>({
  id,
  accessorKey,
  sortingButtonState,
  filterInputState,
  states = { enableResizing: false },
}: ColumnTextModel): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    enableResizing: states.enableResizing,
    // filterFn: "textFilter",
    header: ({ header, column, table }) => (
      <SortingFilterHeader
        header={header}
        column={column}
        table={table}
        headerFunctions={{
          enableResizing: true,
          enableSorting: true,
        }}
        sortingButtonState={{ sortingButtonState }}
        filterInputState={{ filterInputState }}
      />
    ),
    cell: ({ cell }) => {
      return <span>{cell.getValue() as string}</span>;
    },
  };
}
