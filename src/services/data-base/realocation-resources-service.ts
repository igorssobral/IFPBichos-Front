/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../../context/auth-context';

export const ApiRealocationResources = () => {
  const { user } = useAuth();

  const URL = import.meta.env.VITE_APP_DB_URL;
  const token = user?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  

  const saveRealocationResources = (withdrawal: any): Promise<any> => {
    console.log('🚀 ~ saveWithdrawal ~ withdrawal:', withdrawal)
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/resources-realocations`, withdrawal, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  // const getAllWithdrawals = (): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`${URL}/action-campaign`, config)
  //       .then((response: AxiosResponse<any>) => {
  //         resolve(response.data);
  //       })
  //       .catch((error: any) => {
  //         console.error('Erro ao buscar campanhas:', error);
  //         reject(error);
  //       });
  //   });
  // };

  return {
    saveRealocationResources,
  };
};
