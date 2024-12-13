import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HistoryIcon from '@mui/icons-material/History';
// import PaymentIcon from '@mui/icons-material/Payment';
import { BarChart, LocalAtm } from '@mui/icons-material';
import { useAuth } from '../../../context/auth-context';
import { theme } from '../../../themes/styles';
import ModalUndirectedDonation from '../../layout/modal-undirected-donation';

type props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const Menu = ({ open, setOpen }: props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { user } = useAuth();

  const closeDrawer = () => {
    setOpen(false);
  };
  const handleModal = () => {
    setOpenModal(true);
    setOpen(false);
  };

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
              borderBottom: `1px solid ${theme.colors.primary}`,
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
          <List sx={{ height: '100%' }}>
            {user?.userRole === 'ADMIN' ? (
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
            <ListItem button onClick={handleModal}>
              <ListItemIcon>
                <LocalAtm />
              </ListItemIcon>
              <ListItemText primary='Doações não direcionadas' />
            </ListItem>
            {/* <ListItem button component='a' href='#'>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary='Realizar assinatura' />
            </ListItem> */}
            <ListItem button component='a' href='/donation-history'>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary='Histórico de doações' />
            </ListItem>
            {user?.userRole === 'ADMIN' ? (
              <ListItem button component='a' href='/resources-aplication'>
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary='Aplicação de Recursos' />
              </ListItem>
            ) : (
              ''
            )}
          </List>
        </Drawer>
      </SwipeableDrawer>

      {openModal && (
        <ModalUndirectedDonation
          visible={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </React.Fragment>
  );
};
