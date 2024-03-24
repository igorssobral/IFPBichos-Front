import React from "react";
import FormLabels from "@mui/material/FormLabel";

type props = {
  label: string;
  htmlFor: string;
};
export const FormLabel = ({ label, htmlFor }: props) => {
  return (
    <FormLabels style={{ margin: "15px 0px 5px 0px" }} htmlFor={htmlFor}>
      {label}
    </FormLabels>
  );
};
