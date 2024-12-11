/* eslint-disable no-unused-vars */
import './styles.css';

import { Box, Grid, Tooltip } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import dog from '../../../assets/dog.jpg';
import cat from '../../../assets/gato.jpg';
import { CampaignRaw } from '../../../services/@types/campaign';
import { Card } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../../context/auth-context';
import { theme as themes } from '../../../themes/styles';
type CardProps = {
  campaign: CampaignRaw;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

export const CardModal: React.FC<CardProps> = ({
  campaign,
  onEdit,
  onDelete,
  onView,
}) => {
  const { user } = useAuth();

  const handleEditClick = () => {
    onEdit(campaign.id);
  };
  const handleDeleteClick = () => {
    onDelete(campaign.id);
  };
  const handleViewCampaign = () => {
    onView(campaign.id);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 15,
      backgroundColor:
        theme.palette.mode === 'light'
          ? themes.colors.primary
          : themes.colors.bluePrimary,
    },
  }));

  return (
    <Card
      sx={{
        width: '300px',
        height: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '15px',
        backgroundColor: 'rgb(255, 255, 255)',
      }}
    >
      {user?.userRole == 'ADMIN' && (
        <Box className='icons' paddingX={1}>
          <Tooltip title='Editar Campanha'>
            <EditIcon
              style={{ cursor: 'pointer' }}
              color='success'
              onClick={handleEditClick}
            />
          </Tooltip>

          <Tooltip title='Excluir Campanha'>
            <DeleteForeverIcon
              style={{ cursor: 'pointer' }}
              color='error'
              onClick={handleDeleteClick}
            />
          </Tooltip>
        </Box>
      )}

      <Box className='image' onClick={handleViewCampaign}>
        {campaign?.animal === 'GATO' ? (
          <img
            src={campaign.image || cat}
            alt={campaign.title}
          />
        ) : (
          <img
            src={campaign.image || dog}
            alt={campaign.title}
          />
        )}
      </Box>

      <Box className='infor_content' display={'flex'} justifyContent={'center'}>
        <Tooltip title={campaign.title}>
          <Typography
            variant='h4'
            width={'95%'}
            maxHeight={65}
            whiteSpace={'nowrap'}
            overflow={'clip'}
            textAlign={'center'}
            textOverflow={'ellipsis'}
            fontSize={'1.4rem'}
            fontFamily={'Lato, sans-serif'}
            sx={{ cursor: 'default' }}
          >
            {campaign.title}
          </Typography>
        </Tooltip>

        <Box marginTop={3} width={'89%'}>
          <Typography
            variant='h6'
            fontSize={'1.1rem'}
            fontWeight={'300'}
            fontFamily={'Lato, sans-serif'}
          >
            Meta: R${campaign.collectionGoal.toFixed(2)}
          </Typography>
          <Grid container display={'flex'} alignItems={'center'}>
            <Grid width={'70%'}>
              <Box>
                <BorderLinearProgress
                  variant='determinate'
                  value={
                    campaign.collectionPercentage > 100
                      ? 100
                      : campaign.collectionPercentage
                  }
                />
              </Box>
            </Grid>
            <Grid>
              <Typography
                marginLeft={1}
                variant='h3'
                fontSize={'1.1rem'}
                fontWeight={'bold'}
                fontFamily={'Lato, sans-serif'}
              >
                {`${
                  campaign.collectionPercentage > 100
                    ? 100
                    : campaign.collectionPercentage
                }%`}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant='h6'
            fontSize={'.9rem'}
            fontWeight={'300'}
            fontFamily={'Lato, sans-serif'}
          >
            Arrecadado R${campaign.balance.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
