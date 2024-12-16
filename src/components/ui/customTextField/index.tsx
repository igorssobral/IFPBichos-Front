import React from 'react';
import { FormLabel } from '../formLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  id: string;
  label?: string;
  placeholder?: string;
  type: string;
  multiline?: boolean;
  fontSize?: string;
  inputLabelProps?: { shrink?: boolean }; 
  helperText?: string; 
}

const CustomTextField = React.memo(React.forwardRef<HTMLInputElement, CustomTextFieldProps>(({
  id,
  label,
  placeholder,
  type,
  multiline = false,
  fontSize = '15px',
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
      multiline={multiline}
      placeholder={placeholder}
      InputLabelProps={{ shrink: inputLabelProps?.shrink }}
      error={!!helperText} 
      helperText={helperText}
      inputRef={ref}
      {...rest}
      InputProps={{
        style: {
          borderRadius: '7px',
          fontSize,
        },
      }}
    />
  </>
)));

export default CustomTextField;
