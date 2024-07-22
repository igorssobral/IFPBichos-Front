import React from 'react';
import './styles.css';
import { ButtonGroup as ButtonGroups } from '@mui/material';

type props = {
  children: React.ReactNode;
};

export const ButtonGroup = ({ children }: props) => {
  return (
    <ButtonGroups
      className='button-content'
    >
      {children}
    </ButtonGroups>
  );
};
