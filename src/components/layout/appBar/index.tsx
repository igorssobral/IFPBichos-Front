import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu } from "../../ui/menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Logo } from "../../../assets/Logo";

type props = {
  title: string;
  visible: boolean;
  visibleMenu: boolean;
};

export default function ButtonAppBar({ title, visible, visibleMenu }: props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#24CA68" }}>
        <Toolbar>
          {visible && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            IFPBichos
          </Typography>

          <Typography sx={{ flexGrow: 100 }}>
            <Logo />
          </Typography>
          <Typography variant="h4" sx={{ flexGrow: 150 }}>
            {title}
          </Typography>



          {visible && (
            <>
              <Button color="inherit">Login</Button>
              <Badge badgeContent={0} color="warning" style={{ gap: "20px" }}>
                <MailIcon fontSize="medium" />
              </Badge>
            </>
          )}
        </Toolbar>
      </AppBar>

      {isVisible && <Menu isVisible={isVisible} />}
    </Box>
  );
}
