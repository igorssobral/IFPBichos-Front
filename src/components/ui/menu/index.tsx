import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';
import { BarChart, LocalAtm } from '@mui/icons-material';

type props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const Menu = ({ open, setOpen }: props) => {
  const closeDrawer = () => {
    setOpen(false);
  };
  function getLocalStorage() {
    const user = localStorage.getItem('user');

    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    }
    return null;
  }

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor='left'
        open={open}
        onOpen={() => {}}
        onClose={closeDrawer}
      >
        <Drawer
          variant='permanent'
          anchor='left'
          sx={{
            width: 350,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 350,
            },
          }}
        >
          <ListItem
            onClick={() => setOpen(false)}
            component='a'
            key='home'
            style={{
              cursor: 'pointer',
              padding: '11px',
              borderBottom: '1px solid #24CA68',
            }}
          >
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => setOpen(false)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
          </ListItem>
          <List>
            {getLocalStorage()?.userRole === 'ADMIN' ? (
              <ListItem
                button
                component='a'
                href='/createcampanha'
                key='Criar Campanha'
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary='Criar Campanha' />
              </ListItem>
            ) : (
              ''
            )}
            <ListItem button component='a' href='#' >
              <ListItemIcon>
                <LocalAtm/>
              </ListItemIcon>
              <ListItemText primary='Doações não direcionadas' />
            </ListItem>
            <ListItem button component='a' href='#' >
              <ListItemIcon>
                <PaymentIcon/>
              </ListItemIcon>
              <ListItemText primary='Realizar assinatura' />
            </ListItem>
            <ListItem button component='a' href='#' >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary='Histórico de doações' />
            </ListItem>
            <ListItem button component='a' href='#' >
              <ListItemIcon>
                <BarChart/>
              </ListItemIcon>
              <ListItemText primary='Aplicação de Recursos' />
            </ListItem>
          </List>
        </Drawer>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
