/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { ResponsePayment } from '../@types/response-payment';
import { useAuth } from '../../context/auth-context';

export const ApiPayment = () => {
  const { user } = useAuth();

  const URL = import.meta.env.VITE_APP_DB_URL;
  const token = user?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const startPayment = (payment: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/payments`, payment, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const updatePayment = (payment: ResponsePayment): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${URL}/payments/${payment.preferenceId}`, payment, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  const getBalance = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${URL}/balance`, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
  return {
    startPayment,
    updatePayment,
    getBalance,
  };
};
