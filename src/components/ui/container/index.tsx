import React from "react";
import { Box } from "@mui/material";

type props = {
  children: React.ReactNode;
};

export const ContainerModal: React.FC<props> = ({ children }) => {
  return (
    <Box
    width={{lg:"500px",xs:"90%"}}
    height={{lg:"70vh",xs:"60vh"}}
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
    borderRadius={"20px"}
    marginTop={"50px"}
    bgcolor={"white"}

     
    >
      {children}
    </Box>
  );
};
