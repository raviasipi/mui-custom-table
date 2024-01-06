import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import { TToolbarProps } from "../types/types";
import { ExpandMore, MoreVert, Search } from "@mui/icons-material";
import { useState } from "react";

const Toolbar: React.FC<TToolbarProps> = (props) => {
  const {
    tableName,
    search,
    handleSearch,
    tableType,
    setTableType,
    hiddenColumns,
    onChangeHiddenColumns,
    clearHiddenColumns,
    columns,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openTableMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeTableMenu = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "table-menu" : undefined;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Typography sx={{ flexGrow: 1, textAlign: "left" }}>
        {tableName}
      </Typography>
      <OutlinedInput
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        size="small"
        endAdornment={<Search fontSize="small" />}
        placeholder="search here..."
        sx={{ marginRight: "1rem" }}
      />
      <IconButton onClick={openTableMenu}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={closeTableMenu}
        //   sx={{ zIndex: 800, marginTop: "1rem" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 0.5,
            // paddingInline: "1rem",
          }}
        >
          <FormControlLabel
            label="Default Table"
            control={
              <Checkbox
                size="small"
                checked={tableType}
                onChange={(e) => setTableType(e.target.checked)}
              />
            }
            sx={{ paddingInline: "1rem" }}
          />
          <Accordion sx={{ maxWidth: "200px" }} elevation={0} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Hide Columns</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {columns.map((col) => (
                <FormControlLabel
                  label={col.headerName}
                  control={
                    <Switch
                      checked={hiddenColumns.includes(col.headerName)}
                      onChange={(e) =>
                        onChangeHiddenColumns(e.target.checked, col.headerName)
                      }
                    />
                  }
                />
              ))}
              <Box textAlign={"end"}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={clearHiddenColumns}
                >
                  Show All
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Typography textAlign={"left"} sx={{ paddingInline: "1rem" }}>
            Other Menu Options
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default Toolbar;
