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

  return {
    saveRealocationResources,
  };
};
