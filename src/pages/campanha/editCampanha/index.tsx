/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
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
import { CampaignRaw } from '../../../services/@types/campaign';
import { FormLabel } from '../../../components/ui/formLabel';

export const EditCampanha = () => {
  const { getCampaignById, updateCampaign, uploadImage } = ApiCampaign();
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState<File>();
  const [campaign, setCampaign] = useState<CampaignRaw>();
  const [changeImg, setChangeImg] = useState(false);
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
          setCampaign(data);
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

  const updateCurrencyCampaign = async (
    updatedCampaign: CreateCampaignSchema
  ) => {
    let imageUrl = '';
    if (file) {

      imageUrl = await uploadImage(file);
    }
    try {
      await updateCampaign(`${id}`, {
        start: updatedCampaign.startDate,
        end: updatedCampaign.finishedDate,
        title: updatedCampaign.title,
        description: updatedCampaign.description,
        image: imageUrl || campaign?.image,
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

  return (
    <>
      <ButtonAppBar title='' visible />

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Title label='Editar Campanha' />
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

            {campaign?.image && !changeImg ? (
              <>
                {' '}
                <FormLabel label='Imagem' />
                <img src={campaign.image} alt='' style={{ width: '300px',borderRadius:'10px'}} />
                <Button
                  label='Alterar imagem'
                  onClick={() => setChangeImg(true)}
                />
              </>
            ) : (
              <>
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
              </>
            )}

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
