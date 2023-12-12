import React from "react";
import "./styles.css";

type props = {
  children: React.ReactNode;
};

export const Container: React.FC<props> = ({ children }) => {
  return <div className="container">{children}</div>;
};
