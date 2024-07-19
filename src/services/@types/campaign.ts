export interface Campaign {
  id: number;
  title: string;
  collectionGoal: number;
  collectionPercentage: number;
  balance: number;
  animal: string;
  description: string;
  start: string;
  end: string;
  image: File | null;
}


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
  animal: string;
  undirectedBalance: number;
};
