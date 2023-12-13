import React, { useState } from "react";
import "./styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Logo } from "../../../assets/Logo";
import { Menu } from "../../ui/menu";

type props = {
  title: string;
  visible: boolean;
  visibleMenu: boolean;
};

export const Navbar = ({ title, visible, visibleMenu }: props) => {

  const [visibleMenus, setIsVisibleMenus] = useState<boolean>(visibleMenu);

//   function handleclick(){
// setIsVisibleMenus()


//   }
  return (
    <div className="nav_container">
      <nav>
        <span>
          {visible && <MenuIcon onClick={()=>setIsVisibleMenus(!visibleMenus)} fontSize="large" className="icon" style={{cursor: "pointer"}} />}
          IFPBichos
          <Logo />
        </span>

        <div className="title">
          <h1>{title}</h1>
        </div>
        {visible && <div className="profile_section">
          <p> igor@gmail.com</p>
          <Badge badgeContent={1}  color="warning" style={{gap: "20px"}}>
            <MailIcon fontSize="inherit"  />
          </Badge>
        </div>}
        
      </nav>

      {visibleMenus && <Menu isVisible={visible}/>}
    </div>
  );
};
