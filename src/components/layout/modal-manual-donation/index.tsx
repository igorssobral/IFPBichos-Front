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

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
export const ManualDonationModal = ({ isVisible, onClose }: Props) => {

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
  async function handleSaveManualDonation(campaign: ManualDonationSchema) {
    console.log('🚀 ~ handleSaveManualDonation ~ campaign:', campaign);
    // await saveCampaign({
    //   start: campaign.startDate,
    //   end: campaign.finishedDate,
    //   title: campaign.title,
    //   animal: campaign.animal,
    //   description: campaign.description,
    //   image: campaign.file,
    //   collectionGoal: campaign.fundraisingGoal,
    // })
    //   .then((response) => {
    //     // handleBack();
    //     toast.success(response);
    //   })
    //   .catch((error) => {
    //     toast.error(error);
    //   });
  }
  const style = {
    position: 'absolute' as const,
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
  return (
    <Modal open={isVisible} onClose={onClose}>
      <form onSubmit={handleManualDonationSubmit(onSubmitManualDonation)}>
        <Box sx={style} display={'flex'} flexDirection={'column'}>
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
                height='100px'
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
            <Button
              label='Cancelar'
              width='100px'
              onClick={onClose}
            />
          </ButtonGroup>
        </Box>
      </form>
    </Modal>
  );
};
