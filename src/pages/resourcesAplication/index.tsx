/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, FormLabel, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonAppBar from '../../components/layout/appBar';
import { Button } from '../../components/ui/button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../../themes/styles';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';
import { formatValue } from '../../utils/format-money';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { useBalance } from '../../hooks/use-balance';
import { ReportWithdrawal } from '../../components/layout/modal-report-withdrawal';
import { ManualDonationModal } from '../../components/layout/modal-manual-donation';
import { ApiCampaign } from '../../services/data-base/CampaignService';
import { CampaignRaw } from '../../services/@types/campaign';
import { formatInputDate, formatUTC } from '../../utils/format-date';
import { ApiPayment } from '../../services/data-base/payment-service';
import { Donation } from '../../services/@types/donation';
import { ApiWithdrawal } from '../../services/data-base/withdrawal-service';
import { Withdrawals } from '../../services/@types/withdrawal';
import { ResourcesRealocation } from '../../components/layout/modal-resources-realocation';

dayjs.locale('pt-br');

type CombinedData = {
  id: number | string;
  title: string;
  description: string;
  date: string;
  value: number;
  balance?: number;
  collectionGoal?: number;
};
const ResourcesApplication = () => {
  const { getAllCampaignsFinished } = ApiCampaign();
  const { getDonationManual } = ApiPayment();
  const { getAllWithdrawals } = ApiWithdrawal();

  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawals[]>([]);
  const [month, setMonth] = useState<Dayjs | null>(dayjs().startOf('month'));
  const [monthWithdrawal, setMonthWithdrawal] = useState<Dayjs | null>(
    dayjs().startOf('month')
  );
  const { undirectedBalance, campaignsBalance, handleSync } = useBalance();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [openModalRetirada, setOpenModalRetirada] = useState(false);
  const [openModalResources, setOpenModalResources] = useState(false);
  const [selectedEntrada, setSelectedEntrada] = useState<CombinedData>();

  const fetchData = async () => {
    try {
      const [fetchedCampaigns, fetchedDonations] = await Promise.all([
        getAllCampaignsFinished(),
        getDonationManual(),
      ]);

      const combined = combineData(fetchedCampaigns, fetchedDonations);
      setCombinedData(combined);
    } catch (error) {
      or('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchWithdrawals = async () => {
    const fetchWithdrawals = await getAllWithdrawals();
    setWithdrawals(fetchWithdrawals);
  };
  useEffect(() => {
    if (value == '2') {
      fetchWithdrawals();
    }
  }, [value]);

  const filteredWithdrawal = withdrawals?.filter((note) => {
    if (Array.isArray(note.completionDate)) {
      const noteDate = dayjs(
        new Date(
          note.completionDate[0],
          note.completionDate[1] - 1,
          note.completionDate[2],
          note.completionDate[3] || 0,
          note.completionDate[4] || 0,
          note.completionDate[5] || 0
        )
      );

      const isMonthMatch = monthWithdrawal
        ? noteDate.month() === monthWithdrawal.month()
        : true;

      return isMonthMatch;
    }

    return false;
  });

  const combineData = (
    campaigns: CampaignRaw[],
    donations: Donation[]
  ): CombinedData[] => {
    const campaignsData = campaigns.map((campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      date: campaign.end,
      value: campaign.balance,
      balance: campaign.balance,
      collectionGoal: campaign.collectionGoal,
    }));

    const donationsData = donations.map((donation) => ({
      id: donation.id,
      title: donation.title,
      description: donation.description,
      date: donation.date,
      value: donation.donationValue,
    }));

    return [...campaignsData, ...donationsData];
  };

  const filteredCombinedData = combinedData?.filter((note) => {
    if (Array.isArray(note.date)) {
      const noteDate = dayjs(
        new Date(
          note.date[0],
          note.date[1] - 1,
          note.date[2],
          note.date[3] || 0,
          note.date[4] || 0,
          note.date[5] || 0
        )
      );

      const isMonthMatch = month ? noteDate.month() === month.month() : true;

      return isMonthMatch;
    }

    return false;
  });

  const handleCloseModal = () => {
    setOpen(false);
    fetchData();
  };
  const handleCloseModalRetirada = () => {
    setOpenModalRetirada(false);
    fetchData();
    fetchWithdrawals();
  };

  const handleOpenModalResources = (entrada: CombinedData) => {
    setSelectedEntrada(entrada);
    setOpenModalResources(true);
  };

  const handleCloseModalResources = () => {
    setOpenModalResources(false);
    fetchData();
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderTabPanelHeader = (headers: string[]) => (
    <Grid
      display='flex'
      justifyContent='space-around'
      bgcolor={theme.colors.primary}
      padding={2}
      borderRadius={4}
      mt={2}
    >
      {headers.map((header, index) => (
        <Typography
          key={index}
          width={250}
          textAlign='center'
          color='white'
          fontSize={20}
        >
          {header}
        </Typography>
      ))}
    </Grid>
  );

  const tabStyles = {
    '&.Mui-selected': {
      backgroundColor: theme.colors.white,
      color: 'black',
      border: `1px solid ${theme.colors.blackOpacity}`,
    },

    '&:not(.Mui-selected)': {
      backgroundColor: theme.colors.blackOpacity,
      color: 'black',
    },
  };

  return (
    <Container
      maxWidth='xl'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonAppBar visible title='Gerenciar Recursos' />
      <Grid
        mt={2}
        width={{ xs: '98%', lg: '85%' }}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Grid
          width={{ xs: '98%', lg: '80%' }}
          display='flex'
          alignItems='center'
          justifyContent='space-evenly'
          gap={1}
        >
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
              >
                <Grid display='flex' justifyContent='space-between'>
                  <TabList
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: theme.colors.secondary },
                    }}
                  >
                    <Tab label='Entrada' value='1' sx={tabStyles} />
                    <Tab label='Saída' value='2' sx={tabStyles} />
                  </TabList>
                  <Grid sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Grid
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        width={200}
                      >
                        <FormLabel>Mês</FormLabel>
                        <DatePicker
                          value={value == '1' ? month : monthWithdrawal}
                          openTo='month'
                          views={['month']}
                          onChange={(newMonth) =>
                            value == '1'
                              ? setMonth(newMonth)
                              : setMonthWithdrawal(newMonth)
                          }
                        />
                      </Grid>
                    </LocalizationProvider>
                  </Grid>
                  <Grid display='flex' gap={1} alignItems='center'>
                    <FormLabel>Saldo Avulso:</FormLabel>
                    <Typography
                      paddingInline={2}
                      fontSize={17}
                      sx={{ backgroundColor: 'white' }}
                      border={1}
                      borderColor={theme.colors.blackOpacity}
                    >
                      {formatValue(undirectedBalance)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  display='flex'
                  alignItems='center'
                  flexDirection='row'
                  marginTop={3}
                  justifyContent='space-between'
                  gap={1}
                >
                  <Button label='voltar' onClick={() => navigate('/')} />
                  <Grid display='flex' gap={1} alignItems='center'>
                    <FormLabel>Saldo Campanhas:</FormLabel>
                    <Typography
                      paddingInline={1}
                      fontSize={17}
                      sx={{ backgroundColor: 'white' }}
                      border={1}
                      borderColor={theme.colors.blackOpacity}
                    >
                      {formatValue(campaignsBalance || 0)}
                    </Typography>
                  </Grid>
                  <Button
                    label={
                      value === '1' ? 'Doação em espécie' : 'Informar Retirada'
                    }
                    headlight={value === '1' ? true : false}
                    onClick={
                      value === '1'
                        ? () => setOpen(true)
                        : () => setOpenModalRetirada(true)
                    }
                  />
                </Grid>
              </Box>
              <TabPanel value='1' sx={{ paddingInline: 0 }}>
                {renderTabPanelHeader([
                  'Ação',
                  'Motivação',
                  'Data',
                  'Valor Arrecadado',
                ])}
                <Box
                  height={{ md: '50vh', xl: '60vh' }}
                  sx={{ paddingInline: 0, overflowY: 'auto' }}
                >
                  {filteredCombinedData?.map((entrada, index) => (
                    <Grid
                      key={index}
                      display='flex'
                      justifyContent='space-around'
                      padding={2}
                      bgcolor={theme.colors.white}
                      borderRadius={5}
                      marginY={2}
                    >
                      <Typography
                        width={200}
                        textAlign='center'
                        maxHeight={65}
                        whiteSpace={'nowrap'}
                        overflow={'clip'}
                        textOverflow={'ellipsis'}
                      >
                        {entrada.title}
                      </Typography>
                      <Typography
                        width={250}
                        textAlign='start'
                        maxHeight={65}
                        whiteSpace={'nowrap'}
                        overflow={'clip'}
                        textOverflow={'ellipsis'}
                      >
                        {entrada.description}
                      </Typography>
                      <Typography width={70} textAlign='center'>
                        {formatUTC(new Date(formatInputDate(entrada.date)))}
                      </Typography>
                      <Typography
                        width={250}
                        textAlign='center'
                        color={
                          (entrada?.balance ?? 0) >=
                            (entrada?.collectionGoal ?? 0) ||
                          entrada?.collectionGoal == undefined
                            ? theme.colors.primary
                            : 'orange'
                        }
                        onClick={() => {
                          if (
                            (entrada?.balance ?? 0) <
                            (entrada?.collectionGoal ?? 0)
                          )
                            handleOpenModalResources(entrada);
                        }}
                        style={{
                          cursor:
                            (entrada?.balance ?? 0) <
                            (entrada?.collectionGoal ?? 0)
                              ? 'pointer'
                              : 'default',
                        }}
                      >
                        {formatValue(entrada?.value)}
                      </Typography>
                    </Grid>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel value='2' sx={{ paddingInline: 0 }}>
                {renderTabPanelHeader([
                  'Campanha',
                  'Ação',
                  'Data',
                  'Valor Retirado',
                ])}
                <Box
                  height={{ md: '50vh', xl: '60vh' }}
                  sx={{ paddingInline: 0, overflowY: 'auto' }}
                >
                  {filteredWithdrawal?.map((saida, index) => (
                    <Grid
                      key={index}
                      display='flex'
                      justifyContent='space-around'
                      padding={2}
                      bgcolor={theme.colors.white}
                      borderRadius={5}
                      marginY={2}
                    >
                      <Typography
                        width={200}
                        textAlign='center'
                        maxHeight={65}
                        whiteSpace={'nowrap'}
                        overflow={'clip'}
                        textOverflow={'ellipsis'}
                      >
                        {saida.action}
                      </Typography>
                      <Typography
                        width={200}
                        textAlign='center'
                        maxHeight={65}
                        whiteSpace={'nowrap'}
                        overflow={'clip'}
                        textOverflow={'ellipsis'}
                      >
                        {saida.justification}
                      </Typography>
                      <Typography width={200} textAlign='center'>
                        {formatUTC(
                          new Date(formatInputDate(saida.completionDate))
                        )}
                      </Typography>
                      <Typography
                        width={150}
                        textAlign='center'
                        color={theme.colors.redPrimary}
                      >
                        {formatValue(saida.cost)}
                      </Typography>
                    </Grid>
                  ))}
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      {open && (
        <ManualDonationModal
          isVisible={open}
          onClose={handleCloseModal}
          sync={handleSync}
        />
      )}

      {openModalRetirada && (
        <ReportWithdrawal
          isVisible={openModalRetirada}
          onClose={handleCloseModalRetirada}
          sync={handleSync}
        />
      )}

      <ResourcesRealocation
        isVisible={openModalResources}
        campaign={selectedEntrada}
        onClose={handleCloseModalResources}
        sync={handleSync}
      />
    </Container>
  );
};

export default ResourcesApplication;
