/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
} from '@mui/material';
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

import { ApiPayment } from '../../../services/data-base/payment-service';
import { ApiCampaign } from '../../../services/data-base/CampaignService';
import { ResponsePayment } from '../../../services/@types/response-payment';
import { BorderLinearProgress, style, styleButtonUi } from './style';
import { Campaign } from '../../../services/@types/campaign';
import { useAuth } from '../../../context/auth-context';
import { theme } from '../../../themes/styles';
import { ButtonGroup } from '../../../components/ui/button-group';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DonationSchema,
  donationSchema,
} from '../../../schemas/donation-schema';
import { toast } from 'react-toastify';

const ViewCampanha = () => {
  const [responsePayment, setResponsePayment] = useState<ResponsePayment>({
    paymentId: '',
    status: '',
    paymentType: '',
    preferenceId: '',
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<DonationSchema>({
    resolver: zodResolver(donationSchema),
  });

  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>();
  const [sharedLink, setSharedLink] = useState<string>('');
  const [isCopy, setIsCopy] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { startPayment, updatePayment } = ApiPayment();
  const { getCampaignById } = ApiCampaign();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleCopy = async () => {
    try {
      if (inputRef.current) {
        await navigator.clipboard.writeText(sharedLink);
        setIsCopy(true);
      }
    } catch (error) {}
  };
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleBack = () => navigate('/campanhas');

  async function findCampaign() {
    if (id && !campaign) {
      await getCampaignById(id)
        .then((data: Campaign) => {
          setCampaign({
            id: data.id,
            title: data.title,
            description: data.description,
            collectionGoal: data.collectionGoal,
            collectionPercentage: data.collectionPercentage,
            animal: data.animal,
            balance: data.balance,
            start: formatUTC(new Date(formatInputDate(data.start))),
            end: formatUTC(new Date(formatInputDate(data.end))),
            image: data.image,
          });
        })
        .catch((_error) => {});
    }
  }
  useEffect(() => {
    findCampaign();
    handleClick();
  }, []);

  async function handleConfirmDonation(data: DonationSchema) {
    setOpen(true);
    try {
      const response = await startPayment({
        description: campaign?.description,
        title: campaign?.title,
        transactionAmount: data.donation,
        installments: 1,
        campaignId: campaign?.id,
        userLogin: user?.user,
        backUrl: window.location.href,
        isDirected: true,
      });
      window.location.href = response.initPoint;
    } catch (error) {
    } finally {
      setOpen(false);
    }
  }

  const onSubmit: SubmitHandler<DonationSchema> = (data: { donation: number; }) => {
    handleConfirmDonation(data);
  };

  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const params = new URLSearchParams(urlObj.search);

    const paymentId = params.get('payment_id') || '';
    const status = params.get('status') || '';
    const paymentType = params.get('payment_type') || '';
    const preferenceId = params.get('preference_id') || '';

    setResponsePayment({
      paymentId: paymentId,
      status: status,
      paymentType: paymentType,
      preferenceId: preferenceId,
    });
  }, []);

  useEffect(() => {
    const updatePay = async () => {
      if (responsePayment.paymentId && responsePayment.status === 'approved') {
        await updatePayment(responsePayment)
          .then(() => {
            toast.success('Doação realizada com sucesso!');
            window.location.href = `https://ifpbichos-back.onrender.com/view-campaign/${id}`;
          })
          .catch(() => {
            toast.success('Doação não realizada!');
          });
      }
    };
    updatePay();
  }, [responsePayment, id]);

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
                  color={theme.colors.primary}
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
                  sx={styleButtonUi}
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

        {user ? (
          <Modal open={openModal} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={style}>
                <Typography variant='h5' color={theme.colors.primary}>
                  {campaign?.title}
                </Typography>
                <Divider sx={{ marginBottom: 5 }} />
                <Typography variant='subtitle1'>Valor da Doação</Typography>

                <Controller
                  control={control}
                  name='donation'
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      id='donation'
                      label=''
                      type='number'
                      placeholder='R$'
                      variant='outlined'
                      helperText={errors.donation?.message}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  )}
                />
                <ButtonGroup>
                  <Button
                    label='Cancelar'
                    width='200px'
                    onClick={handleCloseModal}
                  />
                  <Button headlight label='Doar' width='200px' type='submit' />
                </ButtonGroup>
              </Box>
            </form>
          </Modal>
        ) : (
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <Typography variant='body1'>
                Crie uma conta ou faça Login para realizar uma doação!
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />

              <ButtonGroup>
                <Button label='Cadastro' onClick={() => navigate('/signUp')} />
                <Button
                  headlight
                  label='Login'
                  width='120px'
                  onClick={() => navigate('/login')}
                />
              </ButtonGroup>
            </Box>
          </Modal>
        )}
      </Grid>
    </>
  );
};

export default ViewCampanha;
