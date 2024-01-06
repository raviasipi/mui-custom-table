import { Box, Button, Menu, OutlinedInput } from "@mui/material";
import { TColumnMenuProps } from "../types/types";

const ColumnMenu : React.FC<TColumnMenuProps> = (props) => {
  const { anchorEl, closeMenu, menuId, filters, onChangeFilters, clearAllFilters } = props;
  const open = Boolean(anchorEl);
  const id = open ? `${menuId}-columnMenu` : undefined;
  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={closeMenu}
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
      <Box sx={{display:"flex", flexDirection:"column", gap:1, paddingInline:".5rem"}}>
        {props.children}
        <OutlinedInput size="small" value={filters[menuId]} onChange={(e)=>onChangeFilters(menuId,e.target.value)} placeholder="search here.."/>
        <Button size="small" variant="contained" onClick={clearAllFilters}>Clear All Filters</Button>
      </Box>
    </Menu>
  );
};

export default ColumnMenu;
