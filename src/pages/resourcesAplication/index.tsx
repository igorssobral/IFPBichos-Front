import { Box, Container, FormLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonAppBar from '../../components/layout/appBar';

import { Button } from '../../components/ui/button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { theme } from '../../themes/styles';
import Tab from '@mui/material/Tab';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

import { formatValue } from '../../utils/format-money';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

// type donationHistory = {
//   titulo: string;
//   date: string;
//   value: number;
//   status: string;
// };

export const ResourcesAplication = () => {
  //   const { user } = useAuth();

  const [month, setMonth] = useState<Dayjs | null>(dayjs().startOf('month'));

  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container
      maxWidth={'xl'}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonAppBar visible title='Gerenciar Recursos' />

      <Grid
        mt={10}
        width={{ xs: '98%', lg: '85%' }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        {/* Filtros */}
        <Grid
          width={{ xs: '98%', lg: '80%' }}
          display={'flex'}
          alignItems={{ lg: 'center', xs: 'start' }}
          flexDirection={{ xs: 'column', md: 'row', lg: 'row' }}
          justifyContent={'space-evenly'}
          gap={1}
        >
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
              >
                <Grid display={'flex'} justifyContent={'space-between'}>
                  <TabList onChange={handleChange}>
                    <Tab label='Entrada' value='1' />
                    <Tab label='Saída' value='2' />
                  </TabList>
                  <Grid sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={['DatePicker', 'DatePicker']}
                        >
                          <Grid
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                            width={200}
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
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid display={'flex'} gap={1} alignItems={'center'}>
                    <FormLabel>Saldo Avulso:</FormLabel>
                    <Typography
                      paddingInline={2}
                      fontSize={17}
                      sx={{ backgroundColor: 'white' }}
                      border={1}
                      borderColor={theme.colors.blackOpacity}
                    >
                      {formatValue(100)}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  display={'flex'}
                  alignItems={{ lg: 'center', xs: 'start' }}
                  flexDirection={{ xs: 'column', md: 'row', lg: 'row' }}
                  marginTop={3}
                  justifyContent={'space-between'}
                  gap={1}
                >
                  <Button label='voltar' onClick={() => navigate('/')} />

                  <Grid display={'flex'} gap={1} alignItems={'center'}>
                    <FormLabel>Saldo Campanhas:</FormLabel>
                    <Typography
                      paddingInline={2}
                      fontSize={17}
                      sx={{ backgroundColor: 'white' }}
                      border={1}
                      borderColor={theme.colors.blackOpacity}
                    >
                      {formatValue(100)}
                    </Typography>
                  </Grid>
                  {value === '1' ? (
                    <Button
                      label='Doação em espécie'
                      headlight
                      onClick={() => navigate('/')}
                    />
                  ) : (
                    <Button
                      label='Informar Retirada'
                      headlight
                      onClick={() => navigate('/')}
                    />
                  )}
                </Grid>
              </Box>
              <TabPanel value='1'>
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
                      Ação
                    </Typography>
                    <Typography
                      width={250}
                      textAlign={'center'}
                      color={'white'}
                      fontSize={20}
                    >
                      Motivação
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
                      Valor Arrecadado
                    </Typography>
                  </Grid>

                  {/* <Grid marginTop={5} height={550} overflow={'auto'} padding={1}>
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
          </Grid> */}
                </Container>
              </TabPanel>
              <TabPanel value='2'>
                {' '}
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
                      Ação
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
                      Valor Retirado
                    </Typography>
                  </Grid>

                  {/* <Grid marginTop={5} height={550} overflow={'auto'} padding={1}>
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
          </Grid> */}
                </Container>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
