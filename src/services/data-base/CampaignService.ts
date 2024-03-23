import axios from "axios";
import { getLocalStorage } from "../../utils/local-storage";

export const ApiCampaign = () => {
  const URL = import.meta.env.VITE_APP_DB_URL;
  const localStorageData = getLocalStorage();
  const token = localStorageData ? localStorageData.token : null;

  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  const saveCampaign = async (campaignData: any) => {
    try {
      const response = await axios.post(
        `${URL}/campaign`,
        campaignData,
        config
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao salvar a campanha:", error);
      throw error;
    }
  };

  const getAllCampaigns = async () => {
    try {
      const response = await axios.get(`${URL}/campaign`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar campanhas:", error);
      throw error;
    }
  };
  const updateCampaign = async (campaignId: string, updatedData: any) => {
    try {
      const response = await axios.put(
        `${URL}/campaign/${campaignId}`,
        updatedData,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar a campanha:", error);
      throw error;
    }
  };
  const deleteCampaign = async (campaignId: any) => {
    try {
      const response = await axios.delete(
        `${URL}/campaign/${campaignId}`,
        config
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };
  const getCampaignById = async (campaignId: string) => {
    try {
      const response = await axios.get(`${URL}/campaign/${campaignId}`,config);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar campanha por ID:", error);
      throw error;
    }
  };

  return {
    saveCampaign,
    updateCampaign,
    getAllCampaigns,
    deleteCampaign,
    getCampaignById,
  };
};
