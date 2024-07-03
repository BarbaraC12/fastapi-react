import React from "react";
import { render } from 'react-dom';

import ResponsiveHeadBar from "./components/Header.tsx";
import Grid from "./components/Table.tsx";
import { Box } from "@mui/material";
import UserTable from "./components/Users.tsx";
import ChangeTable from "./components/Change.tsx";

function App() {
  return (
    <Box>
      <ResponsiveHeadBar />
      <Grid />
      <UserTable />
      <ChangeTable />
    </Box>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)