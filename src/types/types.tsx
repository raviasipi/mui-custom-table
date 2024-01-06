import { ChangeEvent } from "react";

export type TRow = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | (string | number | boolean | null)[];
};

export type TCellProps = {
  value:
    | string
    | number
    | boolean
    | null
    | (string | number | boolean | null)[];
  row: TRow;
};

export type TFilters = {
  [key: string]: string;
};

export type TSort = {
  id: string;
  order: 'desc'|'asc';
};

export type TSticky = {
  direction: "top" | "left" | "bottom" | "right";
  length: number;
};

export type TColumn = {
  field: string;
  headerName: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  sort?: boolean;
  menu?: boolean;
  renderHeader?: (this: TColumn) => JSX.Element;
  renderCell?: (cellProps: TCellProps) => JSX.Element;
  sticky?: TSticky;
};

export type TToolbarProps = {
  tableName: string;
  search: string;
  handleSearch: (input: string) => void;
  tableType: boolean;
  setTableType: (checked: boolean) => void;
  hiddenColumns: string[];
  onChangeHiddenColumns: (checked: boolean, id: string) => void;
  clearHiddenColumns: () => void;
  columns: TColumn[];
  children?: JSX.Element;
};

export type TFooter = {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (_event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type TSortModel = {
  sort: TSort;
  handleSort: (id: string) => void;
};

export type TColumnMenuModel = {
  component: JSX.Element;
  filters: TFilters;
  openMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
};

export type TColumnMenuProps = {
  anchorEl: HTMLButtonElement | null;
  openMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  closeMenu: () => void;
  menuId: string;
  filters: TFilters;
  onChangeFilters: (id: string, value: string) => void;
  clearAllFilters: () => void;
  children?: JSX.Element;
};

export type TCustomTableProps = {
  rows: TRow[];
  columns: TColumn[];
  headerHeight?: number;
  rowHeight?: number;
  toolbar?: JSX.Element;
  footer?: JSX.Element;
  tableType: boolean;
  sortModel: TSortModel;
  columnMenuModel: TColumnMenuModel;
  loading?:boolean;
};
