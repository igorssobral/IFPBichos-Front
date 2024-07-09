/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AxiosResponse } from "axios";
import { getToken } from "../../utils/auth-utils";

export const ApiCampaign = () => {
  const URL = import.meta.env.VITE_APP_DB_URL;
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const saveCampaign = (campaignData: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL}/campaign`, campaignData, config)
        .then((response: AxiosResponse<any>) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error("Erro ao salvar a campanha:", error);
          reject(error);
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
          console.error("Erro ao buscar campanhas:", error);
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
        .put(`${URL}/campaign/${campaignId}`, updatedData, config)
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
          console.error("Erro ao excluir a campanha:", error);
          reject(error);
        });
    });
  };

  const getCampaignById = (campaignId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${URL}/campaign/${campaignId}`, config)
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
