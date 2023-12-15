import React from "react";
import "./styles.css";

type props = {
  children: React.ReactNode;
};

export const ButtonGroup = ({ children }: props) => {
  return <div className="button-content">{children}</div>;
};
