import { Container, FormLabel, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonAppBar from '../../components/layout/appBar';

import { Button } from '../../components/ui/button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../../themes/styles';
import { ApiCampaign } from '../../services/data-base/CampaignService';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { formatInputDate, formatUTC } from '../../utils/format-date';

import { formatValue } from '../../utils/format-money';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

type donationHistory = {
  titulo: string;
  date: string;
  value: number;
  status: string;
};

export const DonationHistory = () => {
  const { user } = useAuth();
  const { getDonationHistory } = ApiCampaign();
  const [donationHistory, setDonationHistory] = useState<donationHistory[]>();
  const [totalDonationValue, setTotalDonationValue] = useState<number>(0);
  const [month, setMonth] = useState<Dayjs | null>(dayjs().startOf('month'));
  const [year, setYear] = useState<Dayjs | null>(dayjs().startOf('year'));

  const navigate = useNavigate();
  
  useEffect(() => {
    const getDonations = async () => {
      if (user) {
        const data = await getDonationHistory(user?.user);
        setDonationHistory(data);
      }
    };
    getDonations();
  }, []);

  const filteredDonationsHistory = donationHistory?.filter((note) => {
    const noteDate = dayjs(note.date); 
    const isYearMatch = year ? noteDate.year() === year.year() : true; 
    const isMonthMatch = month ? noteDate.month() === month.month() : true; 

    return isYearMatch && isMonthMatch;
  });

  useEffect(() => {
    if (filteredDonationsHistory) {
      const totalValue = filteredDonationsHistory?.reduce((accumulator, donation) => {
        return accumulator + donation.value;
      }, 0);

      setTotalDonationValue(totalValue);
    }
  }, [month, year]);

  return (
    <Container
      maxWidth={'xl'}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonAppBar visible title='Histórico de Doações' />

      <Grid
        mt={5}
        width={{xs: '98%', lg: '85%'}}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        {/* Filtros */}
        <Grid
          width={{xs: '100%', md: '80%'}}
          display={'flex'}
          alignItems={{ lg: 'center', xs: 'start' }}
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent={'space-between'}
          gap={{ xs: 2, md: 1 }}
          mb={3}
        >
          <Button label='voltar' onClick={() => navigate('/')} />
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <Grid
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <FormLabel>Mês</FormLabel>
                  <DatePicker
                    value={month}
                    openTo='month'
                    views={['month']}
                    onChange={(month) => setMonth(month)}
                  />
                </Grid>

                <Grid
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <FormLabel>Ano</FormLabel>
                  <DatePicker
                    value={year}
                    openTo='year'
                    views={['year']}
                    onChange={(year) => setYear(year)}
                  />
                </Grid>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid display={'flex'} gap={1} alignItems={'center'}>
            <FormLabel>Total Doado:</FormLabel>
            <Typography
              paddingInline={2}
              fontSize={{ xs: 14, sm: 16 }}
              sx={{ backgroundColor: 'white' }}
              border={1}
              borderColor={theme.colors.blackOpacity}
            >
              {formatValue(totalDonationValue)}
            </Typography>
          </Grid>
        </Grid>

        <Container sx={{ padding: 0 }}>
          <Grid
            container
            justifyContent={'space-around'}
            bgcolor={theme.colors.primary}
            padding={1}
            borderRadius={4}
            mt={2}
          >
            <Typography
              flex={{ xs: 1, sm: 1, md: 1 }}
              textAlign={'center'}
              color={'white'}
              fontSize={{ xs: 14, sm: 16, md: 18 }}
            >
              Campanha
            </Typography>
            <Typography
              flex={{ xs: 1, sm: 1, md: 1 }}
              textAlign={'center'}
              color={'white'}
              fontSize={{ xs: 14, sm: 16, md: 18 }}
            >
              Data
            </Typography>
            <Typography
              flex={{ xs: 1, sm: 1, md: 1 }}
              textAlign={'center'}
              color={'white'}
              fontSize={{ xs: 14, sm: 16, md: 18 }}
            >
              Valor
            </Typography>
            <Typography
              flex={{ xs: 1, sm: 1, md: 1 }}
              textAlign={'center'}
              color={'white'}
              fontSize={{ xs: 14, sm: 16, md: 18 }}
            >
              Status
            </Typography>
          </Grid>

          <Grid marginTop={2} height={550} overflow={'auto'} padding={1}>
            {filteredDonationsHistory?.length !== 0 ? (
              filteredDonationsHistory?.map((data) => (
                <Grid
                  key={data.date}
                  container
                  justifyContent={'space-around'}
                  bgcolor={'white'}
                  padding={2}
                  borderRadius={4}
                  mt={1}
                  gap={{lg:2}}
                  flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                >
                  <Typography
                    flex={{ xs: 1, sm: 1, md: 1 }}
                    color={theme.colors.secondary}
                    border={1}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                    fontWeight={400}
                    padding={0.5}
                  >
                    {data.titulo}
                  </Typography>
                  <Typography
                    flex={{ xs: 1, sm: 1, md: 1 }}
                    color={theme.colors.secondary}
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                    fontWeight={400}
                    padding={0.5}
                  >
                    {formatUTC(new Date(formatInputDate(data.date)))}
                  </Typography>
                  <Typography
                    flex={{ xs: 1, sm: 1, md: 1 }}
                    color={
                      data.status === 'APPROVED' ? theme.colors.primary : 'RED'
                    }
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                    fontWeight={600}
                    padding={0.5}
                  >
                    {formatValue(data.value)}
                  </Typography>
                  <Typography
                    flex={{ xs: 1, sm: 1, md: 1 }}
                    color={
                      data.status === 'APPROVED' ? theme.colors.primary : 'RED'
                    }
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={{ xs: 14, sm: 16, md: 18 }}
                    fontWeight={600}
                    padding={0.5}
                  >
                    {data.status}
                  </Typography>
                </Grid>
              ))
            ) : (
              <Typography fontWeight={'bold'}>Sem resultados</Typography>
            )}
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
};
