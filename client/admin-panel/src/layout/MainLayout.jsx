
import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 250;

const MainLayout = () => {
  const { auth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header onMenuClick={handleSidebarToggle} hamburger={!!auth} />

      {auth && (
        <Sidebar
          open={sidebarOpen}
          onClose={handleSidebarClose}
          drawerWidth={drawerWidth}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          transition: "margin-left 0.3s ease",
          marginLeft:
            auth && !isMobile && sidebarOpen ? `${drawerWidth}px` : 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
