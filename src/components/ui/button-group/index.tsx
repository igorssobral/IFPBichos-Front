import React from 'react';
import './styles.css';
import { ButtonGroup as ButtonGroups } from '@mui/material';

type props = {
  children: React.ReactNode;
};

export const ButtonGroup = ({ children }: props) => {
  return (
    <ButtonGroups
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
      className='button-content'
    >
      {children}
    </ButtonGroups>
  );
};
