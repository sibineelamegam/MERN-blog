import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ onMenuClick, hamburger }) => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} // ensures dropdown shows above drawer
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo + Hamburger */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {hamburger && (
            <IconButton
              color="inherit"
              onClick={onMenuClick}
              edge="start"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Secure Notes
          </Typography>
        </Box>

        {/* Right side: Auth buttons or profile menu */}
        {auth && (
          <Box>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                {auth.username?.[0]?.toUpperCase() || "U"}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disabled>{auth.username}</MenuItem>
              <MenuItem disabled>{auth.email}</MenuItem>
              <MenuItem disabled>Role: {auth.role}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
