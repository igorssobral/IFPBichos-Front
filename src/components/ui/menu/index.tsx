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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

type props = {
  isVisible: boolean;
};

export const Menu = ({ isVisible }: props) => {
  console.log("🚀 ~ file: index.tsx:19 ~ Menu ~ isVisible:", isVisible);
  // const [isVisibleMenu, setIsVisibleMenu] = useState(isVisible);

  // const toggleMenu = () => {
  //   setIsVisibleMenu(!isVisibleMenu);
  // };
  const [isOpen, setIsOpen] = useState(isVisible);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      {isOpen && (
        
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
                width: 440,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 440,
                  transition: "width 0.3s ease-out",
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

              <List>
                <ListItem
                  button
                  component="a"
                  href="/createcampanha"
                  key="Criar Campanha"
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Criar Campanha" />
                </ListItem>
              </List>
            </Drawer>
          </SwipeableDrawer>
        
      )}
    </>
  );
};
