import "./App.css";
import CustomTable from "./components/CustomTable";
import useCustomTable from "./customHooks/useCustomTable";
import { Box } from "@mui/material";

function App() {
  const {
    columns,
    rows,
    sortModel,
    columnMenuModel,
    toolbar,
    footer,
    tableType,
    loading
  } = useCustomTable();
  
  return (
    <Box padding={"2rem"}>
      <CustomTable
        rows={rows}
        columns={columns}
        headerHeight={52}
        rowHeight={32}
        tableType={tableType}
        sortModel={sortModel}
        columnMenuModel={columnMenuModel}
        toolbar={toolbar}
        footer={footer}
        loading={loading}
      />
    </Box>
  );
}

export default App;
