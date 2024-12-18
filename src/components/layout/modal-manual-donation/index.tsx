import React from 'react';
import {
  manualDonationSchema,
  ManualDonationSchema,
} from '../../../schemas/manual-donation-schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Modal, Typography } from '@mui/material';
import { theme } from '../../../themes/styles';
import CustomTextField from '../../ui/customTextField';
import { Button } from '../../ui/button';
import { ButtonGroup } from '../../ui/button-group';
import { useAuth } from '../../../context/auth-context';
import { ApiPayment } from '../../../services/data-base/payment-service';
import { toast } from 'react-toastify';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  sync: () => void;
};
export const ManualDonationModal = ({ isVisible, onClose, sync }: Props) => {
  const { user } = useAuth();
  const { donationManual } = ApiPayment();
  const {
    handleSubmit: handleManualDonationSubmit,
    formState: { errors: manualDonationErrors },
    control: manualDonationControl,
  } = useForm<ManualDonationSchema>({
    resolver: zodResolver(manualDonationSchema),
  });

  const onSubmitManualDonation: SubmitHandler<ManualDonationSchema> = (
    data
  ) => {
    handleSaveManualDonation(data);
  };
  async function handleSaveManualDonation(donation: ManualDonationSchema) {
    await donationManual({
      title: donation.action,
      description: donation.motivation,
      donationValue: donation.ammountCollect,
      userLogin: user?.user,
    })
      .then((response) => {
        onClose();
        sync();
        toast.success(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <Modal open={isVisible} onClose={onClose}>
      <form onSubmit={handleManualDonationSubmit(onSubmitManualDonation)}>
        <Box  display={'flex'} flexDirection={'column'} sx={style}>
          {' '}
          <Typography textAlign={'center'} color={theme.colors.primary}>
            {'Informar Valor'}
          </Typography>
          <Controller
            control={manualDonationControl}
            name='action'
            render={({ field }) => (
              <CustomTextField
                type='text'
                label='Ação'
                id='action'
                placeholder='Digite o titulo'
                helperText={manualDonationErrors?.action?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={manualDonationControl}
            name='motivation'
            render={({ field }) => (
              <CustomTextField
                type='text'
                label='Motivação'
                id='motivation'
                multiline
                minRows={4}
                maxRows={4}
                helperText={manualDonationErrors?.motivation?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={manualDonationControl}
            name='ammountCollect'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='number'
                label='Valor Arrecadado'
                id='value'
                placeholder='R$'
                helperText={manualDonationErrors?.ammountCollect?.message}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
          <ButtonGroup>
            <Button
              label='Salvar'
              type='submit'
              headlight
              width='100px'
              onClick={() => {}}
            />
            <Button label='Cancelar' width='100px' onClick={onClose} />
          </ButtonGroup>
        </Box>
      </form>
    </Modal>
  );
};
