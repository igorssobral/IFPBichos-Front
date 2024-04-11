import "./styles.css";

import React from "react";

type props = {
  label: string;
};

export const Title = ({ label }: props) => {
  return <h1>{label}</h1>;
};
