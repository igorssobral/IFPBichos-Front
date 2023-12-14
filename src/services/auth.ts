import { Campaign } from "./@types/Campaign";

const dataBaseCampaigns = () => {

  async function getCampaigns() {}

  async function editCampaign(id: String, campaign: Campaign) {}

  async function registerNewCampaigns(campaign: any) {}

  async function deleteCampaign(fid: String) {}

  return { getCampaigns, editCampaign, registerNewCampaigns };
};

export { dataBaseCampaigns };
