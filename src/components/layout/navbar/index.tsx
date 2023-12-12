import React from "react";
import "./styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../../../assets/Logo";

type props = {
  title: string;
  visible: boolean;
};

export const Navbar = ({ title, visible }: props) => {
  return (
    <div className="nav_container">
      <nav>
        <span>
          {visible && <MenuIcon fontSize="large" className="icon" />}
           IFPBichos
          <Logo  />
        </span>

        <div >
          <h1>{title}</h1>
        </div>

        <div>

        </div>
      </nav>
    </div>
  );
};
