import React from 'react';
import { FormLabel } from '../formLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'error'> {
  id: string;
  label?: string;
  placeholder?: string;
  type: string;
  multiline?: boolean;
  fontSize?: string;
  inputLabelProps?: boolean;
  error?: boolean;
}

const CustomTextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>(({
  id,
  label,
  placeholder,
  type,
  multiline,
  fontSize,
  inputLabelProps,
  helperText,
  ...rest
}, ref) => (
  <>
    <FormLabel label={label || ''} htmlFor={id} />
    <TextField
      id={id}
      variant="outlined"
      size="small"
      type={type}
      multiline={multiline || false}
      placeholder={placeholder}
      InputLabelProps={{ shrink: inputLabelProps }}
      error={!!helperText}
      helperText={helperText}
      inputRef={ref} // Atribuir a ref aqui
      {...rest}
      InputProps={{
        style: {
          borderRadius: '7px',
          fontSize: fontSize || '15px',
        },
      }}
    />
  </>
));

export default CustomTextField;
