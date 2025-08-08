
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ open, onClose, drawerWidth = 250 }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  const handleNavigation = (path) => {
    navigate(path);
    if ( onClose) onClose(); // auto-close 
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      {auth && auth.role === "admin" && (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard" onClick={() => handleNavigation("/dashboard")}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/blogs" onClick={() => handleNavigation("/blogs")}>
              <ListItemIcon><ArticleIcon /></ListItemIcon>
              <ListItemText primary="Blog Management" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create" onClick={() => handleNavigation("/create")}>
              <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
              <ListItemText primary="Create Blog" />
            </ListItemButton>
          </ListItem>

         
        </List>
      )}
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "persistent"}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "block" },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          top: "64px",
          height: "calc(100% - 64px)",
          borderRight: "none",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
