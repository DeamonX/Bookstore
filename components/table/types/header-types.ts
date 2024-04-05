import {
  ColumnFilterInputModel,
  ColumnSortingButtonModel,
} from "./column-types";
import {
  TableColumnPropsModel,
  TableHeaderPropsModel,
  TablePropsModel,
} from "./table-props";

type HeaderBaseModel = {
  headerTextStyle?: string;
};

export type SortingFilterHeaderModel<TData, TValue> = {
  sortingButtonState: ColumnSortingButtonModel;
  filterInputState: ColumnFilterInputModel;
} & HeaderBaseModel &
  TableHeaderPropsModel<TData, TValue> &
  TablePropsModel<TData> &
  TableColumnPropsModel<TData, TValue>;
