/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable no-empty */
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import React, { useEffect, useRef, useState } from 'react';
import { formatInputDate, formatUTC } from '../../../utils/format-date';
import {
  handleShare,
  handleShareSocial,
} from '../../../components/ui/button/share-button';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import ButtonAppBar from '../../../components/layout/appBar';
import ButtonUi from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Title } from '../../../components/ui/tittle';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { formatValue } from '../../../utils/format-money';
import dog from '../../../assets/dog.jpg';
import cat from '../../../assets/gato.jpg';
import CustomTextField from '../../../components/ui/customTextField';
import { ButtonGroup } from '../../../components/ui/button-group';
import { ApiPayment } from '../../../services/data-base/payment-service';
import { getLocalStorage } from '../../../utils/local-storage';

interface Campaign {
  id: number;
  title: string;
  collectionGoal: number;
  collectionPercentage: number;
  balance: number;
  animal: string;
  description: string;
  start: string;
  end: string;
  image: File | null;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
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
    backgroundColor: theme.palette.mode === 'light' ? '#24CA68' : '#308fe8',
  },
}));

const ViewCampanha = () => {
  const { obj } = useParams<{ obj?: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>();
  const [sharedLink, setSharedLink] = useState<string>('');
  const [isCopy, setIsCopy] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState<string>('');

  const { startPayment } = ApiPayment();
  const handleClick = async () => {
    handleShare((sharedUrl: string) => {
      setSharedLink(sharedUrl);
    });
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsCopy(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    try {
      if (inputRef.current) {
        await navigator.clipboard.writeText(sharedLink);
        setIsCopy(true);
      }
    } catch (error) {
      console.error('Erro ao copiar o link:', error);
    }
  };

  const navigate = useNavigate();

  function handleBack() {
    navigate('/campanhas');
  }

  useEffect(() => {
    handleClick();
    if (obj && !campaign) {
      const decodedObj = decodeURIComponent(obj);

      try {
        const parsedObj: Campaign = JSON.parse(decodedObj);

        setCampaign({
          id: parsedObj.id,
          title: parsedObj.title,
          description: parsedObj.description,
          collectionGoal: parsedObj.collectionGoal,
          collectionPercentage: parsedObj.collectionPercentage,
          animal: parsedObj.animal,
          balance: parsedObj.balance,
          start: formatUTC(new Date(formatInputDate(parsedObj.start))),
          end: formatUTC(new Date(formatInputDate(parsedObj.end))),
          image: parsedObj.image,
        });
      } catch (error) {}
    }
  }, [obj, campaign]);
  //

  async function handleConfirmDonation() {
    setOpen(true);
    await startPayment({
      description: campaign?.description,
      title: campaign?.title,
      transactionAmount: currentValue,
      installments: 1,
      campaignId: campaign?.id,
      userLogin: getLocalStorage().user,
    })
      .then((response) => {
        window.location.href = response.initPoint;

        console.log(response.initPoint);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  }

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <ButtonAppBar title='Campanha' visible />
      <Grid
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Title label={campaign?.title || ''} />

        <Grid
          width={{ lg: 2 / 3, xs: '95%' }}
          display={'flex'}
          marginTop={5}
          gap={8}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={{ xs: 'column', lg: 'row' }}
        >
          <Box
            width={{ lg: '500px', xs: '380px' }}
            borderRadius={'20px'}
            overflow={'hidden'}
          >
            {campaign?.animal === 'GATO' ? (
              <img src={cat} alt='' />
            ) : (
              <img src={dog} alt='' />
            )}
          </Box>

          <Box
            width={'300px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Grid container display={'flex'} justifyContent={'center'} gap={1}>
              <Box width={'100%'}>
                <Typography
                  marginLeft={1}
                  variant='h3'
                  fontSize={'1.1rem'}
                  fontWeight={'600'}
                  fontFamily={'Lato, sans-serif'}
                  textAlign={'center'}
                >
                  {campaign
                    ? `${
                        campaign.collectionPercentage > 100
                          ? 100
                          : campaign.collectionPercentage
                      }%  /  ${formatValue(Number(campaign?.balance))}`
                    : 0}
                </Typography>

                <BorderLinearProgress
                  variant='determinate'
                  value={
                    campaign && campaign?.collectionPercentage > 100
                      ? 100
                      : campaign?.collectionPercentage
                  }
                />
              </Box>

              <Box display={'flex'} flexDirection={'column'}>
                <Typography
                  variant='h6'
                  fontSize={'1.1rem'}
                  fontWeight={'300'}
                  fontFamily={'Lato, sans-serif'}
                  textAlign={'center'}
                >
                  META
                </Typography>
                <Typography
                  variant='h3'
                  fontWeight={'1000'}
                  textAlign={'center'}
                  color={'#24CA68'}
                >
                  {formatValue(Number(campaign?.collectionGoal))}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant='h6'
                  fontWeight={'300'}
                  fontFamily={'Lato, sans-serif'}
                  textAlign={'center'}
                >
                  TERMINA
                  <Typography variant='h5' fontWeight={'bold'}>
                    {campaign?.end}
                  </Typography>
                </Typography>
              </Box>

              <Box width={'100%'} display={'flex'} flexDirection={'column'}>
                <Button
                  label='Realizar Doação'
                  headlight
                  onClick={handleOpen}
                />
                <Button label='voltar' onClick={handleBack} />
              </Box>
            </Grid>
          </Box>
        </Grid>

        <Grid width={{ lg: '850px', xs: '95%' }} marginTop={5}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'start'}
          >
            <Typography fontWeight={'400'}>
              Compartilhe essa campanha
            </Typography>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', lg: 'row' }}
              alignItems={'center'}
            >
              <Box display={'flex'} width={{ xs: '100%', lg: '65%' }}>
                <TextField
                  ref={inputRef}
                  onChange={(e) => setSharedLink(e.target.value)}
                  disabled
                  fullWidth
                  value={sharedLink}
                />
                <ButtonUi
                  onClick={handleCopy}
                  variant='contained'
                  sx={{
                    height: '56px',
                    display: 'block',
                    position: 'relative',
                    left: '-10px',
                    backgroundColor: 'gray',
                    color: 'white',
                    borderRadius: '0px 7px 7px 0px',
                    boxShadow: 'none',
                    ':hover': { backgroundColor: 'gray', boxShadow: 'none' },
                  }}
                >
                  Copiar
                </ButtonUi>
              </Box>

              <Box
                width={{ xs: '100%', lg: '' }}
                display={'flex'}
                alignContent={'left'}
                marginLeft={{ xs: 0, lg: 10 }}
              >
                <IconButton onClick={handleShareSocial}>
                  <FacebookIcon fontSize='large' color='action' />
                </IconButton>
                <IconButton onClick={handleShareSocial}>
                  <InstagramIcon fontSize='large' color='action' />
                </IconButton>

                <IconButton onClick={handleShareSocial}>
                  <WhatsAppIcon fontSize='large' color='action' />
                </IconButton>
              </Box>
            </Box>

            <Box marginY={2}>
              <Typography>Sobre</Typography>
              <Divider />
              <Typography marginTop={2}>{campaign?.description}</Typography>
            </Box>
          </Box>
        </Grid>
        <Snackbar
          open={isCopy}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={800}
          onClose={handleClose}
          message='Link Copiado!'
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color='inherit' />
        </Backdrop>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={style}>
            <Typography variant='h5' color={'#24CA68'}>
              {campaign?.title}
            </Typography>
            <Divider sx={{ marginBottom: 5 }} />
            <Typography variant='subtitle1'>Valor da Doação</Typography>
            <CustomTextField
              id=''
              label=''
              type='number'
              placeholder='R$'
              variant='standard'
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <ButtonGroup>
              <Button label='Cancelar' onClick={handleCloseModal} />
              <Button
                headlight
                label='Doar'
                width='120px'
                onClick={handleConfirmDonation}
              />
            </ButtonGroup>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

export default ViewCampanha;
