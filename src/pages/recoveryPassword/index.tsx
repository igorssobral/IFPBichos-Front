import React, { useState } from 'react';
import { ContainerModal } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Title } from '../../components/ui/tittle';
import CustomTextField from '../../components/ui/customTextField';
import { Alert, AlertTitle, Box } from '@mui/material';
import ButtonAppBar from '../../components/layout/appBar';
import { recoveryPassword } from '../../services/auth';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { emailSchema, EmailSchema } from '../../schemas/emailValidationSchema';

export const RecoveryPassword = () => {
  const [isEmailSubmited, setIsEmailSubmited] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  async function authenticate(data: EmailSchema) {
    await recoveryPassword({
      email: data.email,
    })
      .then((response) => {
        toast.success(response.data);
        setIsEmailSubmited(true);
      })
      .catch((error) => {
        toast.error(error.data);
      });
  }
  const onSubmit: SubmitHandler<EmailSchema> = (data) => {
    authenticate(data);
  };

  return (
    <>
      <ButtonAppBar title='' visible={false} />
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <ContainerModal>
          {isEmailSubmited ? (
            <Box sx={{ width: '90%', mt: 2 }}>
              <Title label='Recuperação de senha'></Title>
              <Alert severity='info'>
                <AlertTitle>Verifique seu e-mail</AlertTitle>
                Um link foi enviado para o endereço de e-mail fornecido. Por
                favor, verifique sua caixa de entrada (ou pasta de spam) e siga
                as instruções.
              </Alert>
            </Box>
          ) : (
            <>
              {' '}
              <Title label='Recuperar senha'></Title>{' '}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Controller
                    control={control}
                    name='email'
                    rules={{ required: false }}
                    render={({ field }) => (
                      <CustomTextField
                        id='login'
                        title='Digite seu email'
                        label='Email de recuperação'
                        type='email'
                        placeholder='nome@email.com'
                        helperText={errors.email?.message}
                        {...field}
                      />
                    )}
                  />
                  <Button
                    label='Alterar senha'
                    width='300px'
                    type='submit'
                    headlight
                  />
                </Box>
              </form>
            </>
          )}
        </ContainerModal>
      </Box>
    </>
  );
};
