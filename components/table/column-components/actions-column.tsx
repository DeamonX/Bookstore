import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import Link from "next/link";
import { ColumnActionsModel } from "../types/column-types";
import { Checkbox } from "@/components/ui/checkbox";
import { getExpandedIcon } from "../utils/icon-helper-functions";

export default function ActionsTableColumn<T>({
  id,
  cellStyle = "",
  headerStyle = "",
  expand = false,
  select = false,
  details = false,
  redirect = false,
  target = undefined,
}: //  router,
ColumnActionsModel): ColumnDef<T> {
  return {
    id: id,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        className={cn("my-auto", headerStyle)}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row, cell }) => {
      return (
        <div className="flex flex-row items-center justify-items-center gap-1.5">
          {select && (
            <Checkbox
              checked={row.getIsSelected()}
              className={cn("my-auto", cellStyle)}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          )}
          {/* {details && <DataTableRowActions row={row} />} */}
          {row.getCanExpand() && expand && (
            <span
              className={cellStyle}
              onClick={row.getToggleExpandedHandler()}
            >
              {getExpandedIcon(row.getIsExpanded())}
            </span>
          )}
          {redirect && target && (
            <Link
              className={cellStyle}
              href={`${target.page}/${
                (row.original as Record<string, any>)[target.key]
              }`}
            >
              <FileText />
            </Link>
          )}
        </div>
      );
    },
  };
}
