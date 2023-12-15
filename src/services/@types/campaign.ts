export type Campaign = {
  id: string;
  title: string;
  description: string;
  meta: number;
  startDate: string;
  finishDate: string;
  image: string;
};

export type CampaignRaw = {
  id: string;
  balance: number;
  campaingStatus: number;
  collectionGoal: number;
  collectionPercentage: number;
  description: string;
  end: string;
  
  image: string;
  start: string;
  title: string;
  undirectedBalance: number;
};
