import React from "react";
import { Container } from "@mui/material";
import "./styles.css";

type props = {
  children: React.ReactNode;
};

export const ContainerModal: React.FC<props> = ({ children }) => {
  return (
    <Container
      style={{
        backgroundColor: "white",
        width: "500px",
        height: "80vh",
        display: "flex",
        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "26px",
        padding: "10px",
      }}
    >
      {children}
    </Container>
  );
};
