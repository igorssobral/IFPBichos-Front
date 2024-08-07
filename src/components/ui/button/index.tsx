import React from 'react';
import ButtonComponent from '@mui/material/Button';
import { theme } from '../../../themes/styles';

type props = {
  width?: string;
  label: string;
  headlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export const Button = ({
  width,
  label,
  headlight,
  disabled,
  onClick,
  type,
}: props) => {
  return (
    <ButtonComponent
      style={{
        width: `${width}`,
        height: '40px',
        borderRadius: 11,
        backgroundColor: `${headlight ? theme.colors.primary : theme.colors.secondary}`,
        marginTop: '20px',
        paddingTop: '10px',
        fontSize: '15px',
        fontWeight: 'bolder',
        boxShadow: 'none',
      }}
      type={type}
      variant='contained'
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </ButtonComponent>
  );
};
