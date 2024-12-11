import React from 'react';
import './styles.css';
import { ContainerModal } from '../../components/ui/container';
import { Button } from '../../components/ui/button';
import { Title } from '../../components/ui/tittle';
import { useNavigate } from 'react-router';
import CustomTextField from '../../components/ui/customTextField';
import { Box } from '@mui/material';
import ButtonAppBar from '../../components/layout/appBar';
import { login } from '../../services/auth';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '../../schemas/login-schema';
import { useAuth } from '../../context/auth-context';
import { toast } from 'react-toastify';

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { logged } = useAuth();
  const navigate = useNavigate();

  async function authenticate(data: LoginSchema) {
    await login({
      login: data.login,
      password: data.password,
    })
      .then((response) => {
        logged(response.data);
        navigate('/campanhas');
      })
      .catch(() => {
        toast.error('Usuário ou senha incorretos!');
      });
  }
  const onSubmit: SubmitHandler<LoginSchema> = (data: { password: string; login: string; }) => {
    authenticate(data);
  };

  return (
    <>
      <ButtonAppBar title='' visible={false} />
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <ContainerModal>
          <Title label='Login'></Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={'flex'} flexDirection={'column'}>
              <Controller
                control={control}
                name='login'
                render={({ field }) => (
                  <CustomTextField
                    id='email'
                    label='Digite seu email'
                    type='text'
                    helperText={errors.login?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name='password'
                render={({ field }) => (
                  <CustomTextField
                    id='password'
                    label='Digite sua senha'
                    type='password'
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <Button label='Entrar' width='300px' type='submit' headlight />
              <a href='/recovery-password' className='span_login'>
                Esqueceu sua senha?
              </a>
            </Box>
          </form>
          <div className='signup'>
            <p>
              Ainda não tem conta?<a href='/signup'>Cadastre-se</a>
            </p>
          </div>
        </ContainerModal>
      </Box>
    </>
  );
};
