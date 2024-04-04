import {
  Column,
  ColumnOrderState,
  SortingState,
  Table,
} from "@tanstack/react-table";

export const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

export const handleSorting = <T>(
  table: Table<T>,
  column: Column<T>,
  newState: "asc" | "desc" | false
) => {
  const tableSortingState = table.getState().sorting;
  if (
    tableSortingState.length < 2 ||
    tableSortingState.find((col) => col.id === column.id)
  ) {
    if (newState === false)
      table.setSorting((sortingState) =>
        sortingState.filter((item) => item.id !== column.id)
      );
    else {
      const existingColumnIndex = tableSortingState.findIndex(
        (item) => item.id === column.id
      );
      const updatedColumn = { id: column.id, desc: newState === "desc" };

      if (existingColumnIndex !== -1) {
        const newSortingState = [...tableSortingState];
        newSortingState[existingColumnIndex] = updatedColumn;
        table.setSorting(newSortingState);
      } else {
        table.setSorting((sortingState) => [...sortingState, updatedColumn]);
      }
    }
  }
};

export const getNextSortingState = (currentState: string | false) => {
  switch (currentState) {
    case false:
      return "asc";
    case "asc":
      return "desc";
    default:
      return false;
  }
};

export const getIndexOfSort = (
  columnID: string,
  state: SortingState
): number => {
  return (
    state
      .map((s) => {
        return s.id;
      })
      .indexOf(columnID) + 1
  );
};
