/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Credentials, ForgotasswordRequest, ResetPasswordRequest } from './@types/auth';
import { getLocalStorage } from '../utils/local-storage';

const URL = import.meta.env.VITE_APP_DB_URL;

export const login = (credentials: Credentials): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth/login`, credentials)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signup = (credentials: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth/userRegistration`, credentials)
      .then(() => {
        resolve('Cadastro realizado com sucesso!');
      })
      .catch(() => {
        reject('Cadastro não realizaado, tente novamente!');
      });
  });
};

export const recoveryPassword = (credentials: ForgotasswordRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth/forgot-password`, credentials)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
export const resetPassword = (credentials: ResetPasswordRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth/reset-password`, credentials)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const isValidToken = (): Promise<any> => {
  const token = getLocalStorage('user')?.token;
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth/isValidToken`, null, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
