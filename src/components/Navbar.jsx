import React from "react";
import {
  Paper,
  Button,
  Select,
  Menu,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { useAppState } from "../AppStateContext";

import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { selectedOptions, updateSelectedOptions } = useAppState(); // Using the useAppState hook

  const handleChange1 = (event) => {
    updateSelectedOptions(event.target.value, selectedOptions.ordering); // Update using the context function
  };

  const handleChange2 = (event) => {
    updateSelectedOptions(selectedOptions.grouping, event.target.value); // Update using the context function
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={0}
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Paper
          style={{
            marginLeft: "1rem",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Button
            aria-controls="dropdown-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            startIcon={<TuneIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            style={{ fontSize: "12px" }}
          >
            Display
          </Button>
        </Paper>
        <Menu
          id="dropdown-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          style={{ marginTop: "10px" }}
        >
          <MenuItem
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Grouping
            <Select
              value={selectedOptions.grouping}
              onChange={handleChange1}
              style={{ width: "100px", marginLeft: "5rem" }} // Adjust width as needed
              size="small"
            >
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </MenuItem>
          <MenuItem
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Ordering
            <Select
              value={selectedOptions.ordering}
              onChange={handleChange2}
              style={{ width: "100px", marginLeft: "5rem" }} // Adjust width as needed
              size="small"
            >
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </MenuItem>
        </Menu>
      </Paper>
    </ThemeProvider>
  );
}
export default Navbar;
