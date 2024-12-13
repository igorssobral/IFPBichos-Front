/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { theme } from '../../../themes/styles';
import { Box, DialogTitle, Modal } from '@mui/material';
import CustomTextField from '../../ui/customTextField';
import { ButtonGroup } from '../../ui/button-group';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  campaignSchema,
  CampaignSchema,
} from '../../../schemas/campaign-schema';
import { ApiRealocationResources } from '../../../services/data-base/realocation-resources-service';
import { toast } from 'react-toastify';
import { useBalance } from '../../../hooks/use-balance';

type Props = {
  isVisible: boolean;
  campaign: any;
  onClose: () => void;
  sync: () => void;
};

export const ResourcesRealocation = ({
  isVisible,
  campaign,
  onClose,
  sync,
}: Props) => {
  const { undirectedBalance } = useBalance();
  const { saveRealocationResources } = ApiRealocationResources();

  const { handleSubmit, formState, control, setValue } =
    useForm<CampaignSchema>({
      resolver: zodResolver(campaignSchema(undirectedBalance)),
    });

  useEffect(() => {
    if (campaign) {
      setValue('title', campaign.title);
      setValue('description', campaign.description);
      setValue('collectionGoal', campaign.collectionGoal);
      setValue('balance', campaign.balance);
      setValue('undirectedBalance', campaign.collectionGoal - campaign.balance);

    }
  }, [campaign, setValue]);

  function handleClose() {
    onClose();
  }

  async function handleResourcesRealocation(value: CampaignSchema) {
    await saveRealocationResources({
      campaignId: campaign.id,
      value: value.undirectedBalance,
      typeRealocation: 'withdrawal',
    })
      .then((response) => {
        handleClose();
        sync();
        toast.success(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  const onSubmitReportWithdrawal: SubmitHandler<CampaignSchema> = (data) => {
    handleResourcesRealocation(data);
  };

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
    <Modal open={isVisible} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmitReportWithdrawal)}>
        <Box sx={style} display={'flex'} flexDirection={'column'}>
          <DialogTitle
            id='responsive-dialog-title'
            textAlign={'center'}
            color={theme.colors.primary}
          >
            {'Realocar Recursos'}
          </DialogTitle>

          <Controller
            control={control}
            name='title'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='text'
                label='Campanha'
                id='acao'
                value={field.value || 'Nenhuma campanha selecionada'}
                helperText={formState.errors?.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='text'
                label='Descrição'
                id='motivation'
                multiline
                minRows={4}
                maxRows={4}
                helperText={formState.errors?.description?.message}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='collectionGoal'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='number'
                label='Meta'
                id='value'
                placeholder='R$'
                helperText={formState.errors?.balance?.message}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='balance'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='number'
                label='Arrecadado'
                id='value'
                placeholder='R$'
                helperText={formState.errors?.balance?.message}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='undirectedBalance'
            render={({ field }) => (
              <CustomTextField
                {...field}
                type='number'
                label='Usar saldo avulso'
                id='value'
                placeholder='Use o saldo avulso e complete a meta'
                helperText={formState?.errors.undirectedBalance?.message}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                inputProps={{ max: campaign.collectionGoal - campaign.balance }}
              />
            )}
          />

          <ButtonGroup>
            <Button
              label='Salvar'
              headlight
              width='100px'
              type='submit'
              onClick={() => {}}
            />
            <Button label='Cancelar' width='100px' onClick={handleClose} />
          </ButtonGroup>
        </Box>
      </form>
    </Modal>
  );
};
