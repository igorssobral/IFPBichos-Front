import React from "react";
import { FormLabel } from "../formLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps extends Omit<TextFieldProps, "error"> {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  multiline?: boolean;
  width?: string;
  height?: string;
  inputLabelProps?: boolean;
  error?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  multiline,
  width,
  height,
  inputLabelProps,
  error,
  helperText,
  ...rest
}) => (
  <>
    <FormLabel label={label} htmlFor={id} />
    <TextField
      id={id}
      variant="outlined"
      size="small"
      type={type}
      multiline={multiline || false}
      placeholder={placeholder}
      InputLabelProps={{ shrink: inputLabelProps }}
      error={helperText ? true : false}
      helperText={helperText}
      {...rest}
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
