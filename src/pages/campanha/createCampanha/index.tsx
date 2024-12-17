/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreateCampaignSchema,
  createCampaignSchema,
} from '../../../schemas/create-campaign-schema';
import React, { useState } from 'react';
import { ApiCampaign } from '../../../services/data-base/CampaignService';
import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Button } from '../../../components/ui/button';
import ButtonAppBar from '../../../components/layout/appBar';
import { ButtonGroup } from '../../../components/ui/button-group';
import CustomTextField from '../../../components/ui/customTextField';
import { Title } from '../../../components/ui/tittle';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from '../../../utils/format-date';
import { toast } from 'react-toastify';

const renderController = (
  control: any,
  name: string,
  Component: React.ElementType,
  helperText: string,
  additionalProps: any = {}
) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Component {...field} helperText={helperText} {...additionalProps} />
    )}
  />
);

export const CreateCampanha = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: { startDate: formatISO(new Date()) },
  });

  const { saveCampaign, uploadImage } = ApiCampaign();
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();

  const handleBack = () => navigate('/campanhas');

  const handleSaveCampaign = async (campaign: CreateCampaignSchema) => {
    let imageUrl = '';
    if (file) {
      imageUrl = await uploadImage(file);
    }
    try {
      const response = await saveCampaign({
        start: campaign.startDate,
        end: campaign.finishedDate,
        title: campaign.title,
        animal: campaign.animal,
        description: campaign.description,
        image: imageUrl || '',
        collectionGoal: campaign.fundraisingGoal,
      });
      toast.success(response);
      handleBack();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const onSubmit: SubmitHandler<CreateCampaignSchema> = (data) => {
    handleSaveCampaign(data);
  };

  return (
    <>
      <ButtonAppBar title='' visible />
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Title label='Nova Campanha' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={'flex'} flexDirection={'column'}>
            {renderController(
              control,
              'title',
              CustomTextField,
              errors?.title?.message || '',
              {
                label: 'Título',
                placeholder: 'Digite o título',
                type: 'text',
              }
            )}

            {renderController(
              control,
              'description',
              CustomTextField,
              errors?.description?.message || '',
              {
                label: 'Descrição',
                placeholder: 'Digite uma descrição',
                multiline: true,
                minRows: 4,
                maxRows: 4,
              }
            )}

            <Controller
              control={control}
              name='animal'
              render={({ field }) => (
                <>
                  <InputLabel sx={{ marginTop: '10px' }}>Animal</InputLabel>
                  <Select
                    value={field.value || 'Selecione'}
                    placeholder='Selecione'
                    onChange={field.onChange}
                    error={!!errors.animal?.message}
                    sx={{ marginBottom: '10px', borderRadius: 2 }}
                  >
                    <MenuItem value='Selecione'>Selecione</MenuItem>
                    <MenuItem value='GATO'>Gato</MenuItem>
                    <MenuItem value='CACHORRO'>Cachorro</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {errors.animal?.message}
                  </FormHelperText>
                </>
              )}
            />

            {renderController(
              control,
              'fundraisingGoal',
              CustomTextField,
              errors?.fundraisingGoal?.message || '',
              {
                label: 'Meta de arrecadação',
                placeholder: 'Digite uma meta',
                type: 'number',
              }
            )}

            {renderController(
              control,
              'startDate',
              CustomTextField,
              errors?.startDate?.message || '',
              {
                label: 'Data Início',
                type: 'date',
                disabled: true,
              }
            )}

            {renderController(
              control,
              'finishedDate',
              CustomTextField,
              errors?.finishedDate?.message || '',
              {
                label: 'Data Final',
                type: 'date',
              }
            )}

            {renderController(
              control,
              'file',
              CustomTextField,
              errors?.file?.message || '',
              {
                label: 'Imagem',
                type: 'file',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    setFile(file);
                  }
                },
              }
            )}

            <ButtonGroup>
              <Button headlight label='Salvar' type='submit' />
              <Button label='Cancelar' headlight={false} onClick={handleBack} />
            </ButtonGroup>
          </Box>
        </form>
      </Box>
    </>
  );
};
