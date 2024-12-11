/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  NotificationsActiveOutlined,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import { theme } from '../../themes/styles';

interface CampaignNotificationDTO {
  id: string;
  start: string; 
  end: string; 
  title: string;
  description?: string | null;
}

const NotificationBadge: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setSocket] = useState<WebSocket | null>(null);
  const [notifications, setNotifications] = useState<CampaignNotificationDTO[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleNotification = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleNavigate = (id: string) => () => {
    navigate(`/view-campaign/${id}`);
  };

  useEffect(() => {
    const ws = new WebSocket(`wss://ifpbichos-back.onrender.com/ws/notifications`);
    setSocket(ws);

    ws.onopen = () => {
    };

    ws.onmessage = (event) => {
      try {
        const data: CampaignNotificationDTO = JSON.parse(event.data);
        setNotifications((prevNotifications) => [...prevNotifications, data]);
        setSnackbarMessage(`Nova campanha criada: ${data.title}`);
        handleNotification(`Nova campanha criada: ${data.title}`);
      } catch (e) {
        console.error('Erro ao parsear a mensagem:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IconButton>
          <Badge badgeContent={notifications.length} color='warning'>
            <MailIcon fontSize='medium' sx={{color: 'white'}} />
          </Badge>
        </IconButton>
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity='info'>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNavigate(notification.id)}
              sx={{ borderRadius: 1 ,borderBottom: 1, borderColor: theme.colors.blackOpacity}}
            >
              <Grid display={'flex'} gap={1} justifyContent={'center'} padding={1}>
                <NotificationsActiveOutlined /> Nova campanha: <Typography >{notification.title}</Typography>
              </Grid>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>
            <NotificationsNoneOutlined />
            Sem notificações no momento
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default NotificationBadge;
