import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LinearProgress from "@mui/material/LinearProgress";

import "./styles.css";

type props = {
  children: React.ReactNode;
};
export const Card = ({ children }: props) => {
  return (
    <>
      <div className="card">
        <div className="icons">
          <EditIcon color="success" />
          <DeleteForeverIcon color="error" />
        </div>
        <div className="image">
          <img src="src\assets\dog.jpg" alt="" />
        </div>

        <div className="infor_content">
          <h2>Castração do Calabreso</h2>
          <p>Meta: R$500,00</p>
          <div>
            <LinearProgress variant="determinate" value={50} />
          </div>
          <p>Arrecadado R$0.00</p>
        </div>
      </div>
    </>
  );
};
