/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

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
import {
  CreateCampaignSchema,
  createCampaignSchema,
} from '../../../schemas/create-campaign-schema';
import { formatInputDate } from '../../../utils/format-date';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

export const EditCampanha = () => {
  const { getCampaignById, updateCampaign } = ApiCampaign();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
  });

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getCampaignById(id);

        if (data) {
          setFormValues(data);
        }
      }
    })();
  }, [id]);

  const setFormValues = (data: any) => {
    setValue('title', data.title);
    setValue('description', data.description);
    setValue('animal', data.animal);
    setValue('fundraisingGoal', data.collectionGoal);
    setValue('startDate', formatInputDate(data.start));
    setValue('finishedDate', formatInputDate(data.end));
  };

  const updateCurrencyCampaign = async (updatedCampaign: CreateCampaignSchema) => {
    try {
      await updateCampaign(`${id}`, {
        start: updatedCampaign.startDate,
        end: updatedCampaign.finishedDate,
        title: updatedCampaign.title,
        description: updatedCampaign.description,
        image: updatedCampaign.file,
        collectionGoal: updatedCampaign.fundraisingGoal,
        animal: updatedCampaign.animal,
      });
      toast.success('Campanha editada com sucesso!');
      handleBack();
    } catch (error) {
      toast.error('Ocorreu um erro ao editar essa campanha!');
    }
  };

  const onSubmit: SubmitHandler<CreateCampaignSchema> = (data) => {
    updateCurrencyCampaign(data);
  };

  const handleBack = () => {
    navigate('/campanhas');
  };

  const renderController = (
    name: keyof CreateCampaignSchema,
    render: (field: any) => JSX.Element,
    rules: any = {}
  ) => (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => render(field)}
    />
  );

  return (
    <>
      <ButtonAppBar title='' visible />

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Title label='Editar Campanha' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={'flex'} flexDirection={'column'}>
            {renderController('title', (field) => (
              <CustomTextField
                id='title'
                label='Titulo'
                placeholder='Digite o titulo'
                type='text'
                helperText={errors?.title?.message}
                {...field}
              />
            ))}

            {renderController('description', (field) => (
              <CustomTextField
                id='description'
                label='Descrição'
                placeholder='Digite uma descrição'
                multiline
                type='text'
                minRows={4}
                maxRows={4}
                helperText={errors?.description?.message}
                {...field}
              />
            ))}

            {renderController('animal', (field) => (
              <>
                <InputLabel sx={{ marginTop: '10px' }}>Animal</InputLabel>
                <Select
                  value={field.value || ''}
                  onChange={field.onChange}
                  error={!!errors.animal?.message}
                  sx={{ marginBottom: '10px', borderRadius: 2 }}
                >
                  <MenuItem value={'Selecione'}>Selecione</MenuItem>
                  <MenuItem value={'GATO'}>Gato</MenuItem>
                  <MenuItem value={'CACHORRO'}>Cachorro</MenuItem>
                </Select>
                <FormHelperText error>{errors.animal?.message}</FormHelperText>
              </>
            ))}

            {renderController('fundraisingGoal', (field) => (
              <CustomTextField
                id='fundraisingGoal'
                label='Meta de arrecadação'
                placeholder='Digite uma meta'
                type='number'
                helperText={errors?.fundraisingGoal?.message}
                {...field}
              />
            ))}

            {renderController('startDate', (field) => (
              <CustomTextField
                id='startDate'
                label='Data Inicio'
                type='date'
                helperText={errors?.startDate?.message}
                disabled={true}
                {...field}
              />
            ))}

            {renderController('finishedDate', (field) => (
              <CustomTextField
                id='finishedDate'
                label='Data Final'
                type='date'
                helperText={errors?.finishedDate?.message}
                {...field}
              />
            ))}

            {renderController('file', (field) => (
              <CustomTextField
                id='file'
                title='Imagem'
                label=' '
                type='file'
                helperText={errors?.file?.message}
                {...field}
              />
            ))}

            <ButtonGroup>
              <Button headlight label='Salvar' type='submit' />
              <Button
                label='cancelar'
                width=''
                headlight={false}
                onClick={handleBack}
              />
            </ButtonGroup>
          </Box>
        </form>
      </Box>
    </>
  );
};
