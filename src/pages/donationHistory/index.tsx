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
  }, [user]);

  const filteredDonationsHistory = donationHistory?.filter((note) => {
    const noteDate = dayjs(note.date);
    const isYearMatch = year ? noteDate.year() === year.year() : true;
    const isMonthMatch = month ? noteDate.month() === month.month() : true;

    return isYearMatch && isMonthMatch;
  });

  useEffect(() => {
    if (filteredDonationsHistory && Array.isArray(filteredDonationsHistory)) {
      const totalValue = filteredDonationsHistory.reduce(
        (accumulator, donation) => {
          if (
            donation?.status === 'APPROVED' &&
            typeof donation.value === 'number'
          ) {
            return accumulator + donation.value;
          }
          return accumulator;
        },
        0
      );

      setTotalDonationValue(totalValue);
    }
  }, [month, year, donationHistory, filteredDonationsHistory]);
 
  const DonationTable = ({ filteredDonationsHistory }) => {
    return (
      <TableContainer sx={{ maxHeight: 550, overflow: 'auto' }}>
        <Table aria-label="doações" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Campanha</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Data</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDonationsHistory?.length !== 0 ? (
              filteredDonationsHistory.map((data) => (
                <TableRow hover key={data.id}>
                  <TableCell
                    align="center"
                    sx={{
                      color: theme.colors.secondary,
                      border: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'clip',
                      textOverflow: 'ellipsis',
                      borderColor: theme.colors.blackOpacity,
                      borderRadius: 2,
                      padding: 0.5,
                    }}
                  >
                    {data.titulo}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: theme.colors.secondary,
                      border: 1,
                      borderColor: theme.colors.blackOpacity,
                      borderRadius: 2,
                      padding: 0.5,
                    }}
                  >
                    {formatUTC(new Date(formatInputDate(data.date)))}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: data.status === 'APPROVED' ? theme.colors.primary : 'red',
                      border: 1,
                      borderColor: theme.colors.blackOpacity,
                      borderRadius: 2,
                      fontWeight: 600,
                      padding: 0.5,
                    }}
                  >
                    {formatValue(data.value)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: data.status === 'APPROVED' ? theme.colors.primary : 'red',
                      border: 1,
                      borderColor: theme.colors.blackOpacity,
                      borderRadius: 2,
                      fontWeight: 600,
                      padding: 0.5,
                    }}
                  >
                    {data.status === 'APPROVED' ? 'APROVADO' : 'PENDENTE'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>Nenhuma doação realizada nesse período</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  

  
  return (
    <Container
      maxWidth={'xl'}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonAppBar visible title='Histórico de Doações' />

      <Grid
        mt={{xs:1,md:10}}
        width={{ xs: '98%', lg: '85%' }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        {/* Filtros */}
        <Grid
          width={{ xs: '98%', lg: '80%' }}
          display={'flex'}
          alignItems={{ lg: 'center', xs: 'center' }}
          flexDirection={{ xs: 'column', md: 'row', lg: 'row' }}
          justifyContent={'space-evenly'}
          gap={1}
        >
          <Button label='voltar' onClick={() => navigate('/')} />
          <Grid sx={{ display: 'flex', alignItems: 'center', gap: 5 }} width={{xs:'100%'}}>
            <Grid sx={{ display: 'flex', alignItems: 'center' }} width={{xs:'100%'}} >
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <Grid display={'flex'} gap={5}>
                     <Grid
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    width={150}
                  >
                    <FormLabel>Mês</FormLabel>{' '}
                    <DatePicker
                      value={month}
                      openTo='month'
                      view='month'
                      views={['month']}
                      onChange={(month) => setMonth(month)}
                    />
                  </Grid>

                  <Grid
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    width={150}
                  >
                    <FormLabel>Ano</FormLabel>
                    <DatePicker
                      value={year}
                      openTo='year'
                      views={['year']}
                      onChange={(year) => setYear(year)}
                    />
                  </Grid>
                  </Grid>
                 
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid display={'flex'} gap={1} alignItems={'center'} mt={2}>
            <FormLabel>Total Doado:</FormLabel>
            <Typography
              paddingInline={2}
              fontSize={17}
              sx={{ backgroundColor: 'white' }}
              border={1}
              borderColor={theme.colors.blackOpacity}
            >
              {formatValue(totalDonationValue)}
            </Typography>
          </Grid>
        </Grid>

        <Container>
          <Grid
            display={'flex'}
            justifyContent={'space-around'}
            bgcolor={theme.colors.primary}
            padding={2}
            borderRadius={4}
            mt={5}
          >
            <Typography
              width={250}
              textAlign={'center'}
              color={'white'}
              fontSize={20}
            >
              Campanha
            </Typography>
            <Typography
              width={250}
              textAlign={'center'}
              color={'white'}
              fontSize={20}
            >
              Data
            </Typography>
            <Typography
              width={250}
              textAlign={'center'}
              color={'white'}
              fontSize={20}
            >
              Valor
            </Typography>
            <Typography
              width={250}
              textAlign={'center'}
              color={'white'}
              fontSize={20}
            >
              Status
            </Typography>
          </Grid>

          <Grid marginTop={5} height={550} overflow={'auto'} padding={1}>
            {filteredDonationsHistory?.length != 0 ? (
              filteredDonationsHistory?.map((data) => (
                <Grid
                  display={'flex'}
                  justifyContent={'space-around'}
                  bgcolor={'white'}
                  padding={2}
                  borderRadius={4}
                  mt={1}
                >
                  <Typography
                    width={250}
                    color={theme.colors.secondary}
                    border={1}
                    whiteSpace={'nowrap'}
                    overflow={'clip'}
                    textOverflow={'ellipsis'}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={18}
                    fontWeight={400}
                    padding={0.5}
                  >
                    {data.titulo}
                  </Typography>
                  <Typography
                    width={250}
                    color={theme.colors.secondary}
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={18}
                    fontWeight={400}
                    padding={0.5}
                  >
                    {formatUTC(new Date(formatInputDate(data.date)))}
                  </Typography>
                  <Typography
                    width={250}
                    color={
                      data.status == 'APPROVED' ? theme.colors.primary : 'RED'
                    }
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={18}
                    fontWeight={600}
                    padding={0.5}
                  >
                    {formatValue(data.value)}
                  </Typography>
                  <Typography
                    width={250}
                    color={
                      data.status == 'APPROVED' ? theme.colors.primary : 'RED'
                    }
                    border={1}
                    borderColor={theme.colors.blackOpacity}
                    borderRadius={2}
                    textAlign={'center'}
                    fontSize={18}
                    fontWeight={600}
                    padding={0.5}
                  >
                    {data.status == 'APPROVED' ? 'APROVADO' : 'PENDENTE'}
                  </Typography>
                </Grid>
              ))
            ) : (
              <Typography textAlign={'center'}>
                Nenhuma doação realizada nesse período
              </Typography>
            )}
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
};
