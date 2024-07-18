/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { getToken } from '../../utils/auth-utils';
import { ResponsePayment } from '../@types/response-payment';

export const ApiPayment = () => {
  const URL = import.meta.env.VITE_APP_DB_URL;
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const startPayment = (payment: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/payments`, payment,config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error('Erro ao salvar a campanha:', error);
          reject(error);
        });
    });
  };
  const updatePayment = (payment: ResponsePayment): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${URL}/payments/${payment.preferenceId}`, payment,config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error('Erro ao salvar a campanha:', error);
          reject(error);
        });
    });
  };
  return {
    startPayment,
    updatePayment,
  };
};
