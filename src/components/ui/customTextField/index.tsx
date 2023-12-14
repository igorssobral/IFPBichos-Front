import React, { InputHTMLAttributes } from "react";
import { FormLabel } from "../formLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormControl } from "@mui/material";

interface CustomTextFieldProps {
  id: string;
  title: string;
  label: string;
  type: string;
  height?: string;
  placeholder?: string;
  inputLabelProps?: boolean;
  textFieldProps?: TextFieldProps;
  value: string | number | Date | File | null;
  onChange: (value: string | number | Date | File) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  title,
  label,
  type,
  textFieldProps,
  height,
  placeholder,
  inputLabelProps,
  value,
  onChange,
  ...props
}) => (
  <div>
    <FormControl>
      <FormLabel label={title} htmlFor={id} />
      <TextField
        id={id}
        label={label}
        variant="outlined"
        size="small"
        type={type}
        placeholder={placeholder}
        InputLabelProps={{ shrink: inputLabelProps }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
        InputProps={{
          style: {
            width: "300px",
            height: height || "40px",
            borderRadius: "15px",
          },
          ...(textFieldProps?.InputProps || {}),
        }}
      />
    </FormControl>
  </div>
);

export default CustomTextField;
