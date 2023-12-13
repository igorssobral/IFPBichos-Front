import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { Home } from "../../../pages/home";
import { Login } from "../../../pages/login";
import { CreateCampanha } from "../../../pages/campanha/createCampanha";

type props = {
  isVisible: boolean;
};

export const Menu = ({ isVisible }: props) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(isVisible);

  return (
    <>
      {isVisibleMenu && (
        <div style={{ display: "flex" }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 440,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: 440,
              },
            }}
          >
            <ListItem
              onClick={() => setIsVisibleMenu(!isVisibleMenu)}
              component="a"
              key="home"
              
              style={{ cursor: "pointer", padding: "17px" , borderBottom: "1px solid #24CA68" }}
            >
              <ListItemIcon>
                <MenuIcon fontSize="large"/>
              </ListItemIcon>
              <ListItemText primary="Menu" aria-setsize={50}/>
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
        </div>
      )}
    </>
  );
};
