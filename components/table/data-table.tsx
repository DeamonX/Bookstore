"use client";
import { Fragment, useState } from "react";
import {
  ColumnDef,
  ColumnOrderState,
  FilterFn,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// declare module "@tanstack/table-core" {
//   interface FilterFns {
//     textFilter: FilterFn<unknown>;
//   }
// }
declare module "@tanstack/table-core" {
  interface TableMeta<TData extends unknown> {
    addRow: () => void;
    removeRow: (id: number) => void;
  }
}

// DataTableMain props interface
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  subComponent?: ({
    columns,
    data,
  }: {
    columns: ColumnDef<TData, TValue>[];
    data: Row<TData>;
  }) => React.ReactNode;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  subComponent,
}: DataTableProps<TData, TValue>) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    state: {
      columnOrder,
    },
    // filterFns: {
    //   textFilter: textFilter,
    // },
    enableRowSelection: true,
    enableColumnResizing: true,
    getRowCanExpand: () => true,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="space-y-4 block max-w-full">
      {/* <DataTableToolbar table={table} /> */}
      <Table>
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header, idx) => (
              <TableHead
                colSpan={header.colSpan}
                className="w-auto"
                key={idx}
                style={{ width: "auto" }}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>
                      {subComponent &&
                        subComponent({
                          data: row,
                          columns: columns,
                        })}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>
                            {table.getFooterGroups().map((footerGroup) => (
                                <TableRow key={footerGroup.id}>
                                    {footerGroup.headers.map((footer, index) => (
                                        <TableCell >
                                            {flexRender(
                                                footer.column.columnDef.footer,
                                                footer.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableFooter> */}
      </Table>
      {/* <DataTablePagination table={table} /> */}
    </div>
    // </DndProvider>
  );
};

export default DataTable;
