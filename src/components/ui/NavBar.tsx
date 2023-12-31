import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";

import { motion } from "framer-motion";
import CartPopUp from "../pages/Cart/CartPopUp";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: "Home", url: "/", icon: <HomeIcon sx={{ mr: 0.1 }} /> },
  {
    name: "About Us",
    url: "/about-us",
    icon: <Person2Icon sx={{ mr: 0.1 }} />,
  },
  { name: "Contact", url: "/contact", icon: <EmailIcon sx={{ mr: 0.1 }} /> },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SUCULENTAS
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            sx={{ justifyContent: "center" }}
            key={item.name}
            disablePadding
          >
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? "navItem active"
                  : isPending
                  ? "navItem pending"
                  : "navItem"
              }
              to={item.url}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className="navBar">
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            className="navItems"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            {navItems.map((item) => (
              <motion.div key={item.name} whileTap={{ scale: 0.5 }}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "navItem active"
                      : isPending
                      ? "navItem pending"
                      : "navItem"
                  }
                  to={item.url}
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </Box>
          <CartPopUp />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
