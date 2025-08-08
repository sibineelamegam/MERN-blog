import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { headerStyles } from "../styles/headerStyle";

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={headerStyles.titleLink}
        >
          Blog
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
