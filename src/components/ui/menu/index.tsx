import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

type props = {
  isVisible: boolean;
};

export const Menu = ({ isVisible }: props) => {

  function getLocalStorage() {
    const user = localStorage.getItem("user");

    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    }
    return null;
  }
  const [isOpen, setIsOpen] = useState(isVisible);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 340,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 340,
            },
          }}
        >
          <ListItem
            onClick={toggleDrawer(false)}
            component="a"
            key="home"
            style={{
              cursor: "pointer",
              padding: "11px",
              borderBottom: "1px solid #24CA68",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(false)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
          </ListItem>

          {getLocalStorage() !== null && getLocalStorage().userRole == "ADMIN" ? (
            <List>
              <ListItem
                button
                component="a"
                href="/createcampanha"
                key="Criar Campanha"
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Criar Campanha" />
              </ListItem>
            </List>
          ) : (
            ""
          )}
        </Drawer>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
