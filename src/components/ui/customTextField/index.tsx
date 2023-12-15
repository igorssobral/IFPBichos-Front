import React from "react";
import { FormLabel } from "../formLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps {
  id: string;
  title: string;
  label: string;
  type: string;
  multiline?: boolean;
  width?: string;
  height?: string;
  placeholder?: string;
  inputLabelProps?: boolean;
  textFieldProps?: TextFieldProps;
  value: string | number | Date | File | null;
  error?: string;
  onChange: (value: string | number | Date | File) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  title,
  label,
  type,
  multiline,
  textFieldProps,
  width,
  height,
  placeholder,
  inputLabelProps,
  value,
  error,
  onChange,
  ...props
}) => (
  <>
    <FormLabel label={title} htmlFor={id} />
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      type={type}
      multiline={multiline || false}
      placeholder={placeholder}
      InputLabelProps={{ shrink: inputLabelProps }}
      value={value}
      error={Boolean(error)}
      helperText={error}
      onChange={(e) => onChange(e.target.value)}
      {...props}
      InputProps={{
        style: {
          width: width || "300px",
          height: height || "40px",
          borderRadius: "15px",
        },
        ...(textFieldProps?.InputProps || {}),
      }}
    />
  </>
);

export default CustomTextField;
