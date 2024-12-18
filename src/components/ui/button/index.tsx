import React from 'react';
import ButtonComponent from '@mui/material/Button';
import { theme } from '../../../themes/styles';

type Props = {
  width?: string;
  label: string;
  headlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
} & React.ComponentProps<typeof ButtonComponent>;

export const Button = ({
  width,
  label,
  headlight,
  disabled,
  onClick,
  type,
  ...rest
}: Props) => {
  return (
    <ButtonComponent
      sx={{
        width: `${width}`,
        height: '40px',
        borderRadius: 2,
        backgroundColor: `${
          headlight ? theme.colors.primary : theme.colors.secondary
        }`,
        marginTop: '20px',
        paddingTop: '10px',
        fontSize: '15px',
        fontWeight: 'bolder',
        boxShadow: 'none',
        border: headlight
          ? `1px solid ${theme.colors.primary}`
          : `1px solid ${theme.colors.secondary}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: headlight ? theme.colors.white : theme.colors.white,
          color: headlight ? theme.colors.primary : theme.colors.secondary,

          boxShadow: 'none',
        },
      }}
      type={type}
      variant='contained'
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {label}
    </ButtonComponent>
  );
};
