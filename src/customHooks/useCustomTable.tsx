import { ChangeEvent, useEffect, useState } from "react";
import { countryData } from "../constants/constants";
import {
  TCellProps,
  TColumn,
  TColumnMenuModel,
  TFilters,
  TRow,
  TSort,
} from "../types/types";
import ColumnMenu from "../components/ColumnMenu";
import Toolbar from "../components/Toolbar";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

const useCustomTable = () => {
  //Loading
  const [loading, setLoading] = useState(false);

  //rows
  const [rows, setRows] = useState<TRow[]>([]);

  //columns
  const renderSelectCell = (args: TCellProps) => {
    const { row } = args;
    const isChecked = selectedRecords.filter(
      (record) => record.name === row.name
    ).length
      ? true
      : false;
    return (
      <Checkbox
        checked={isChecked}
        onChange={(e) => handleToggleSelect(e.target.checked, row)}
      />
    );
  };
  const renderSelectHeader = () => {
    return (
      <Box flexGrow={1}>
        <Checkbox disabled />
      </Box>
    );
  };

  function renderWrappedHeader(this: TColumn) {
    const { headerName } = this;
    return (
      <Typography paddingLeft={".5rem"} flexGrow={1}>
        {headerName}
      </Typography>
    );
  }

  const columns: TColumn[] = [
    {
      field: "Select",
      headerName: "Select",
      minWidth: 100,
      align: "center",
      sort: false,
      menu: true,
      sticky: { direction: "left", length: 0 },
      renderHeader: renderSelectHeader,
      renderCell: renderSelectCell,
    },
    {
      field: "name",
      headerName: "Country Name",
      minWidth: 800,
      sort: true,
      menu: true,
      sticky: { direction: "left", length: 100 },
      renderHeader: renderWrappedHeader,
    },
    {
      field: "code",
      headerName: "ISO\u00a0Code",
      minWidth: 300,
      menu: true,
      // sticky: { direction: "left", length: 900 },
    },
    {
      field: "population",
      headerName: "Population",
      minWidth: 170,
      align: "right",
      sort: true,
      menu: true,
    },
    {
      field: "size",
      headerName: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      sort: true,
      menu: true,
      // sticky: { direction: "right", length: 270 },
    },
  ];

  // pagination/footer
  const [count, setCount] = useState<number>(countryData.length);
  const [tableType, setTableType] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const footerProps = {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    count,
  };
  const footer = <Footer {...footerProps} />;

  //selected Records
  const [showSelectedRecords, setShowSelectedRecords] =
    useState<boolean>(false);
  const [selectedRecords, setSelectedRecord] = useState<TRow[]>([]);
  const handleToggleSelect = (checked: boolean, row: TRow) => {
    let records: TRow[] = [];
    if (checked) {
      records = [...selectedRecords, row];
    } else {
      records = selectedRecords.filter((record) => record.name !== row.name);
    }
    setSelectedRecord(records);
  };

  const clearSelectedRecords = () => {
    setSelectedRecord([]);
    closeMenu();
  };

  const handleToggleSelectedRecords = (checked: boolean) => {
    setShowSelectedRecords(checked);
  };

  //Sort
  const [sort, setSort] = useState<TSort>({ id: "name", order: "asc" });
  const handleSort = (id: string) => {
    if (sort.id === id) {
      const order = sort.order === "asc" ? "desc" : "asc";
      setSort({ id, order });
    } else {
      setSort({ id, order: "asc" });
    }
  };
  const sortModel = {
    sort,
    handleSort,
  };

  //Column Menu
  const [filters, setFilters] = useState<TFilters>({});
  const [menuId, setMenuId] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuId(id);
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const onChangeFilters = (id: string, value: string) => {
    setFilters({ ...filters, [id]: value });
  };
  const clearAllFilters = () => {
    setFilters({});
    closeMenu();
  };
  const ColumnMenuChild = () => {
    if (menuId === "Select") {
      return (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={showSelectedRecords}
                onChange={(e) => handleToggleSelectedRecords(e.target.checked)}
              />
            }
            label="Show Selected"
          />
          <Button variant="outlined" onClick={clearSelectedRecords}>
            Clear Selected
          </Button>
        </>
      );
    } else {
      return;
    }
  };

  const columnMenuProps = {
    anchorEl,
    openMenu,
    closeMenu,
    menuId,
    filters,
    onChangeFilters,
    clearAllFilters,
  };

  const columnMenuModel: TColumnMenuModel = {
    component: (
      <ColumnMenu {...columnMenuProps}>
        <ColumnMenuChild />
      </ColumnMenu>
    ),
    filters,
    openMenu,
  };

  //toolbar
  const tableName = "MUI Custom Table";
  const [search, setSearch] = useState<string>("");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const handleSearch = (input: string) => {
    setSearch(input);
  };
  const onChangeHiddenColumns = (checked: boolean, id: string) => {
    if (checked) {
      setHiddenColumns([...hiddenColumns, id]);
    } else {
      const newColumns = hiddenColumns.filter((col) => col !== id);
      setHiddenColumns(newColumns);
    }
  };
  const clearHiddenColumns = () => {
    setHiddenColumns([]);
  };
  const toolbarProps = {
    tableName,
    search,
    handleSearch,
    tableType,
    setTableType,
    hiddenColumns,
    onChangeHiddenColumns,
    clearHiddenColumns,
    columns,
  };
  const toolbar = <Toolbar {...toolbarProps} />;

  //data fetching
  const fetchData = () => {
    const newRows = countryData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setRows(newRows);
    setLoading(false);
  };

  //side Effects
  useEffect(() => {
    setLoading(true);
    const getData = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => clearTimeout(getData);
  }, [filters, search]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [sort, page, rowsPerPage]);

  useEffect(() => {
    if (showSelectedRecords) {
      setPage(0);
      setCount(selectedRecords.length);
    } else {
      setCount(countryData.length);
    }
  }, [showSelectedRecords, selectedRecords]);

  //Filtered Columns
  const filteredColumns: TColumn[] = columns.filter(
    (col) => !hiddenColumns.includes(col.headerName)
  );

  return {
    columns: filteredColumns,
    rows: showSelectedRecords ? selectedRecords : rows,
    sortModel,
    columnMenuModel,
    toolbar,
    footer,
    tableType,
    loading,
  };
};

export default useCustomTable;
