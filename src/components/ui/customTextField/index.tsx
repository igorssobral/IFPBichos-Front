import React from "react";
import { FormLabel } from "../formLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps extends Omit<TextFieldProps, "error"> {
  id: string;
  title: string;
  label: string;
  type: string;
  multiline?: boolean;
  width?: string;
  height?: string;
  placeholder?: string;
  inputLabelProps?: boolean;
  error?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  title,
  label,
  type,
  multiline,
  width,
  height,
  placeholder,
  inputLabelProps,
  error,
  ...props
}) => (
  <>
    <FormLabel label={title} htmlFor={id} />
    <TextField
      id={id}
      variant="outlined"
      size="small"
      type={type}
      multiline={multiline || false}
      placeholder={label}
      InputLabelProps={{ shrink: inputLabelProps }}
      error={props.helperText ? true : false}
      helperText={props.helperText}
      {...props}
      InputProps={{
        style: {
          width: width || "300px",
          height: height || "40px",
          borderRadius: "10px",
        },
      }}
    />
  </>
);

export default CustomTextField;
