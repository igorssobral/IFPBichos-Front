export type Withdrawals = {
    id: number;
    campaignId: number;
    justification: string;
    action: string;
    cost: number;
    completionDate: string;
    receipt: string | null;
    withdrawalFromUndirectedBalance: number;
  };
  