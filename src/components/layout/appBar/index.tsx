import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Logo } from '../../../assets/Logo';
import MailIcon from '@mui/icons-material/Mail';
import { Menu } from '../../ui/menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuPopupState from '../../ui/miniMenu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../context/auth-context';
import { theme } from '../../../themes/styles';

type Props = {
  title: string;
  visible: boolean;
};

export default function ButtonAppBar({ title, visible }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const openMenu = () => setDrawerOpen(true);

  function redirect() {
    if (user !== null) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }

  return (
    <Box>
      <AppBar
        position='fixed'
        elevation={0}
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: theme.colors.primary,
          height: '70px',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Grid
            sx={{ cursor: 'pointer' }}
            display={'flex'}
            flexDirection={{ xs: 'column-reverse', lg: 'row' }}
            gap={{ lg: 1 }}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={() => navigate('/')}
          >
            <Typography
              fontSize={{ lg: 30, xs: 15 }}
              component='div'
              sx={{ flexGrow: 1 }}
            >
              IFPBichos
            </Typography>

            <Typography width={{ lg: '80px', xs: '50px' }}>
              <Logo />
            </Typography>
          </Grid>

          <Grid
            display={'flex'}
            gap={{ lg: 1 }}
            alignItems={'center'}
            justifyContent={'center'}
            marginLeft={
              title.length > 0
                ? {
                    lg: 'calc(50% - 22rem)',
                    xs: 'calc(50% - 9rem)',
                  }
                : {
                    lg: 'calc(50% - 13rem)',
                    xs: 'calc(50% - 1.8rem)',
                  }
            }
          >
            <Typography fontSize={{ lg: 30, xs: 21 }}>{title}</Typography>
          </Grid>

          {visible && (
            <>
              {user !== null ? (
                <Grid
                  display={'flex'}
                  alignItems={'center'}
                  marginLeft={{
                    lg: 'calc(50% - 25rem)',
                    xs: 'calc(50% - 18rem)',
                  }}
                >
                  <Typography visibility={{ xs: 'hidden', md: 'visible' }}>
                    {user.user}
                  </Typography>

                  <MenuPopupState />
                  {user != null && (
                    <Badge badgeContent={0} color='warning'>
                      <MailIcon fontSize='medium' />
                    </Badge>
                  )}
                </Grid>
              ) : (
                <Grid
                  display={'flex'}
                  alignItems={'center'}
                  position={'fixed'}
                  gap={0}
                  left={{
                    xs: '75%',
                    md: '93%',
                  }}
                >
                  <Button color='inherit' onClick={redirect}>
                    Login
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Menu open={drawerOpen} setOpen={setDrawerOpen} />
    </Box>
  );
}
