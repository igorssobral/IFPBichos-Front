/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ApiCampaign } from '../services/data-base/CampaignService';
import { ApiPayment } from '../services/data-base/payment-service';

export const useBalance = () => {
  const [undirectedBalance, setUndirectedBalance] = useState<number>(0);
  const [campaignsBalance, setCampaignsBalance] = useState<number>(0);
  const { getBalance } = ApiPayment();
  const { getTotalBalance } = ApiCampaign();
  const [sync, setSync] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const undirected = await getBalance();
        const campaigns = await getTotalBalance();
        setUndirectedBalance(undirected.balance);
        setCampaignsBalance(campaigns);
      } catch (error) {}
    };

    fetchBalances();
  }, [sync]);

  function handleSync() {
    setSync(!sync);
  }

  return { undirectedBalance, campaignsBalance, handleSync };
};
