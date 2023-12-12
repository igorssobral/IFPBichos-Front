import React from "react";
import "./styles.css";

type props = {
  label: string;
};

export const Title = ({ label }: props) => {
  return <h1>{label}</h1>;
};
