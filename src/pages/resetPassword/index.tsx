import React, { useEffect, useState } from 'react';
// import './styles.css';
import { ContainerModal } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Title } from '../../components/ui/tittle';
import { useNavigate } from 'react-router';
import CustomTextField from '../../components/ui/customTextField';
import { Alert, AlertTitle, Box } from '@mui/material';
import ButtonAppBar from '../../components/layout/appBar';
import { resetPassword } from '../../services/auth';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  passwordValidationSchema,
  PasswordValidationSchema,
} from '../../schemas/passwordValidationSchema';

export const ResetPassword = () => {
  const [tokenResetPassword, setTokenResetPassword] = useState<string>('');
  const [passwordResetSucess, setPasswordResetSucess] = useState(true);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PasswordValidationSchema>({
    resolver: zodResolver(passwordValidationSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const params = new URLSearchParams(urlObj.search);

    const tokenResetPassword = params.get('token') || '';
    setTokenResetPassword(tokenResetPassword);
  }, []);

  async function authenticate(data: PasswordValidationSchema) {
    await resetPassword({
      token: tokenResetPassword,
      newPassword: data.password,
    })
      .then((response) => {
         toast.success(response.data)
        setPasswordResetSucess(true);
      })
      .catch((error) => {
         toast.error(error.data);
      });
  }
  const onSubmit: SubmitHandler<PasswordValidationSchema> = (data) => {
    authenticate(data);
  };

  return (
    <>
      <ButtonAppBar title='' visible={false} />
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <ContainerModal>
          {passwordResetSucess ? (
            <Box sx={{ width: '90%', mt: 2 , display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Alert severity='success'>
                <AlertTitle>Senha Alterada com Sucesso</AlertTitle>
                Sua senha foi atualizada com sucesso. Você já pode usar a nova
                senha para acessar sua conta.
              </Alert>
              <Button
                label='Fazer login'
                width='300px'
                onClick={() => navigate('/login')}
                headlight
              />
            </Box>
          ) : (
            <>
              <Title label='Alterar senha'></Title>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Controller
                    control={control}
                    name='password'
                    rules={{ required: false }}
                    render={({ field }) => (
                      <CustomTextField
                        id='password'
                        title='Senha'
                        label='Nova senha'
                        type='password'
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name='confirmPassword'
                    rules={{ required: false }}
                    render={({ field }) => (
                      <CustomTextField
                        id='confirmPassword'
                        title='Senha'
                        label='Repita a nova senha'
                        type='password'
                        helperText={errors.confirmPassword?.message}
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
