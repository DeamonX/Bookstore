import { NextRouter } from "next/router";

export type ColumnBaseModel = {
  id: string;
  accessorKey: string;
  headerStyle?: string;
  headerTextStyle?: string;
  cellStyle?: string;
};

export type ColumnActionsModel = {
  expand?: boolean;
  select?: boolean;
  details?: boolean;
  redirect?: boolean;
  router?: NextRouter;
  target?: { page: string; key: string };
} & ColumnBaseModel;

export type ColumnSortingButtonModel = {
  sortingButtonState: {
    text: string;
    style?: string;
  };
};

export type ColumnFilterInputModel = {
  filterInputState?: {
    placeholder?: string;
    style?: string;
  };
};

export type ColumnTextModel = {} & ColumnFilterInputModel &
  ColumnBaseModel &
  ColumnSortingButtonModel;
