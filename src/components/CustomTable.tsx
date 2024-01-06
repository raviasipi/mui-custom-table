import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton, TableSortLabel, Typography } from "@mui/material";
import { TCustomTableProps } from "../types/types";
import { FilterAlt, MoreVert } from "@mui/icons-material";

export default function CustomTable(props: TCustomTableProps) {
  const {
    rows,
    columns,
    headerHeight,
    rowHeight,
    tableType,
    sortModel,
    columnMenuModel,
    toolbar,
    footer,
    loading,
  } = { ...props };

  const { sort, handleSort } = sortModel;
  const { component: columnMenu, filters, openMenu } = columnMenuModel;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={6}>
      {toolbar}
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const styles: React.CSSProperties =
                  column.sticky && !tableType
                    ? {
                        position: "sticky",
                        zIndex: 900,
                        ...{
                          [column.sticky
                            .direction]: `${column.sticky.length}px`,
                        },
                      }
                    : {};
                return (
                  <TableCell
                    key={column.field}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "skyblue",
                      boxSizing: "border-box",
                      border: "1px solid rgba(224, 224, 224, 1)",
                      ...styles,
                      padding: 0,
                      height: headerHeight ? headerHeight : 40,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {column.renderHeader ? (
                        column.renderHeader()
                      ) : (
                        <Typography
                          sx={{
                            flexGrow: 1,
                            textAlign: "left",
                            paddingLeft: ".5rem",
                          }}
                        >
                          {column.headerName}
                        </Typography>
                      )}
                      {column.sort && (
                        <TableSortLabel
                          onClick={() => handleSort(column.field)}
                          active={column.field === sort.id}
                          direction={sort.order}
                        />
                      )}
                      {column.menu && (
                        <IconButton
                          sx={{ padding: "0", marginRight: ".5rem" }}
                          onClick={(e) => openMenu(e, column.field)}
                        >
                          {filters[column.field]?.length > 0 ? (
                            <FilterAlt fontSize="small" />
                          ) : (
                            <MoreVert fontSize="small" />
                          )}
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {loading ? (
            <Typography>Loading ...</Typography>
          ) : rows.length > 0 ? (
            <TableBody>
              {rows
                //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={Object.values(row).toString()}
                    >
                      {columns.map((column) => {
                        const value = row[column.field];
                        const styles: React.CSSProperties =
                          column.sticky && !tableType
                            ? {
                                position: "sticky",
                                zIndex: 800,
                                backgroundColor: "white",
                                ...{
                                  [column.sticky.direction]:
                                    column.sticky.length,
                                },
                              }
                            : {};
                        return (
                          <TableCell
                            key={column.field}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              ...styles,
                              padding: 0,
                              height: rowHeight ? rowHeight : 32,
                            }}
                          >
                            {column.renderCell ? (
                              column.renderCell({ value, row })
                            ) : (
                              <Typography paddingInline={".5rem"}>
                                {value}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <Typography>No Rows</Typography>
          )}
        </Table>
      </TableContainer>
      {footer}
      {columnMenu}
    </Paper>
  );
}
