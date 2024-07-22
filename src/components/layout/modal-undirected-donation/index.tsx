import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { style } from './style';
import { ButtonGroup } from '../../ui/button-group';
import { Button } from '../../ui/button';
import CustomTextField from '../../ui/customTextField';
import { useAuth } from '../../../context/auth-context';
import { ApiPayment } from '../../../services/data-base/payment-service';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  donationSchema,
  DonationSchema,
} from '../../../schemas/donation-schema';
import { zodResolver } from '@hookform/resolvers/zod';

type props = {
  visible: boolean;
  onClose: () => void;
};
export default function ModalUndirectedDonation({ onClose, visible }: props) {
  const { startPayment } = ApiPayment();
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<DonationSchema>({
    resolver: zodResolver(donationSchema),
  });

  const { user } = useAuth();

  const handleClose = () => onClose();

  async function handleConfirmDonation(data: DonationSchema) {
    setOpen(true);
    try {
      const response = await startPayment({
        title: 'Doação não direcionada.',
        description: 'Doação não direcionada.',
        transactionAmount: data.donation,
        installments: 1,
        campaignId: null,
        userLogin: user?.user,
        backUrl: window.location.href,
        isDirected: false,
      });
      window.location.href = response.initPoint;
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error);
    }
    setOpen(false);
    handleClose();
  }

  const onSubmit: SubmitHandler<DonationSchema> = (data) => {
    handleConfirmDonation(data);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={{ lg: '30%' }} padding={{ lg: 6 }} sx={{ ...style }}>
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <Typography gutterBottom variant={'h5'} component='div'>
              Doação não direcionada
            </Typography>
          </Stack>
          <Typography color='text.secondary' variant='body2'>
            Esta doação não será direcionada a uma campanha, mas poderá ser
            usada pelos administradores em campanhas que ainda não atingiram a
            meta.
          </Typography>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction='row' spacing={1}></Stack>
          </Box>
          <Typography variant='subtitle1'>Valor da Doação</Typography>
          <Controller
            control={control}
            name='donation'
            render={({ field }) => (
              <CustomTextField
                id='donation'
                label=''
                type='number'
                placeholder='R$'
                variant='outlined'
                helperText={errors.donation?.message}
                onChange={(e) => 
                  field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <ButtonGroup>
            <Button label='Cancelar' width='200px' onClick={handleClose} />
            <Button headlight label='Doar' width='200px' type='submit' />
          </ButtonGroup>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Box>
      </form>
    </Modal>
  );
}
