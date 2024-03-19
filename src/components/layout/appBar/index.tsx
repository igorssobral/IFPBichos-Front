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
import { useNavigate } from "react-router";
import { getLocalStorage } from "../../../utils/local-storage";
import MenuPopupState from "../../ui/miniMenu";
type Props = {
  title: string;
  visible: boolean;
};

export default function ButtonAppBar({ title, visible }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const user = getLocalStorage();
  function redirect() {
    if (getLocalStorage() !== null) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }
  const toggleMenu = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0} style={{ backgroundColor: "#24CA68" }}>
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
          <Typography variant="h4" sx={{ position: "absolute", left: "45%" }}>
            {title}
          </Typography>

          {visible && (
            <>
              {user !== null ? (
                <Button color="inherit">
                  {user.email}
                  <MenuPopupState />
                </Button>
              ) : (
                <Button color="inherit" onClick={redirect}>
                  Login
                </Button>
              )}

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
