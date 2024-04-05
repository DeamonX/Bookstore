import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import SortingFilterHeader from "./headers/sorting-filter-header";
import { ColumnTextModel } from "../types/column-types";

export default function DateWithFilterTableColumn<T>({
  id,
  accessorKey,
  sortingButtonState,
  filterInputState,
}: ColumnTextModel): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    // filterFn: 'textFilter',
    header: ({ column, header, table }) => (
      <SortingFilterHeader
        header={header}
        column={column}
        table={table}
        sortingButtonState={{ sortingButtonState }}
        filterInputState={{ filterInputState }}
      />
    ),
    cell: ({ cell }) => {
      try {
        const date = cell.getValue() as Date;
        return (
          <>
            {format(date, "PP", {
              locale: hu,
            })}
          </>
        );
      } catch (e) {
        return <></>;
      }
    },
  };
}
