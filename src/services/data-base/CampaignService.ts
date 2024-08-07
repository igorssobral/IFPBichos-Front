/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useAuth } from '../../context/auth-context';

export const ApiCampaign = () => {
  const { user } = useAuth();

  const URL = import.meta.env.VITE_APP_DB_URL;
  const token = user?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const saveCampaign = (campaignData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/campaign`, campaignData, config)
        .then(() => {
          resolve('Campanha criada com sucesso!');
        })
        .catch(() => {
          reject('Erro ao salvar a campanha:');
        });
    });
  };

  const getAllCampaigns = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${URL}/campaign`)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error('Erro ao buscar campanhas:', error);
          reject(error);
        });
    });
  };

  const updateCampaign = (
    campaignId: string,
    updatedData: any
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${URL}/campaign/${campaignId}`, updatedData, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const deleteCampaign = (campaignId: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${URL}/campaign/${campaignId}`, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error('Erro ao excluir a campanha:', error);
          reject(error);
        });
    });
  };

  const getCampaignById = (campaignId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${URL}/campaign/${campaignId}`)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return {
    saveCampaign,
    updateCampaign,
    getAllCampaigns,
    deleteCampaign,
    getCampaignById,
  };
};
