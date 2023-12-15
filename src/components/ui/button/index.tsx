import React from "react";
import ButtonComponent from "@mui/material/Button";

type props = {
  width?: string;
  label: string;
  headlight?: boolean;
  onClick: () => void;
};

export const Button = ({ width, label, headlight, onClick }: props) => {
  return (
    <ButtonComponent
      style={{
        width: `${width}`,
        height: "40px",
        borderRadius: 15,
        backgroundColor: `${headlight ? "#24CA68" : "#404040"}`,
        marginTop: "20px",
        paddingTop: "10px",
        fontSize: "15px",
        fontWeight: "bolder",
        boxShadow: "none",
      }}
      variant="contained"
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  );
};
