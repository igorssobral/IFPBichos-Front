import {
  Box,
  Container,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
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

dayjs.locale('pt-br');

const ResourcesApplication = () => {
  const [month, setMonth] = useState<Dayjs | null>(dayjs().startOf('month'));
  const { undirectedBalance, campaignsBalance } = useBalance();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [openModalRetirada, setOpenModalRetirada] = useState(false);

  const handleCloseModal = () => setOpen(false);
  const handleCloseModalRetirada = () => setOpenModalRetirada(false);

  const entradas = [
    {
      acao: 'Doação Avulsa',
      motivacao: 'Contribuição voluntária',
      data: '10/08/2024',
      valorArrecadado: 150.0,
    },
    {
      acao: 'Doação Avulsa',
      motivacao: 'Arrecadação no Campus',
      data: '15/08/2024',
      valorArrecadado: 500.0,
    },
  ];

  const saidas = [
    {
      campanha: 'Campanha',
      acao: 'Compra de Brinquedos',
      data: '20/08/2024',
      valorRetirado: 200.0,
    },
    {
      campanha: 'Castração',
      acao: 'Compra de Alimentos',
      data: '22/08/2024',
      valorRetirado: 300.0,
    },
  ];

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
      mt={5}
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
        mt={10}
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
                          value={month}
                          openTo='month'
                          views={['month']}
                          onChange={(newMonth) => setMonth(newMonth)}
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
                      paddingInline={2}
                      fontSize={17}
                      sx={{ backgroundColor: 'white' }}
                      border={1}
                      borderColor={theme.colors.blackOpacity}
                    >
                      {formatValue(campaignsBalance)}
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
                {entradas.map((entrada, index) => (
                  <Grid
                    key={index}
                    display='flex'
                    justifyContent='space-around'
                    padding={2}
                    bgcolor={theme.colors.white}
                    borderRadius={5}
                    marginY={2}
                  >
                    <Typography width={250} textAlign='center'>
                      {entrada.acao}
                    </Typography>
                    <Typography width={250} textAlign='center'>
                      {entrada.motivacao}
                    </Typography>
                    <Typography width={250} textAlign='center'>
                      {entrada.data}
                    </Typography>
                    <Typography
                      width={250}
                      textAlign='center'
                      color={theme.colors.primary}
                    >
                      {formatValue(entrada.valorArrecadado)}
                    </Typography>
                  </Grid>
                ))}
              </TabPanel>
              <TabPanel value='2' sx={{ paddingInline: 0 }}>
                {renderTabPanelHeader([
                  'Campanha',
                  'Ação',
                  'Data',
                  'Valor Retirado',
                ])}
                {saidas.map((saida, index) => (
                  <Grid
                    key={index}
                    display='flex'
                    justifyContent='space-around'
                    padding={2}
                    bgcolor={theme.colors.white}
                    borderRadius={5}
                    marginY={2}
                  >
                    <Typography width={200} textAlign='center'>
                      {saida.campanha}
                    </Typography>
                    <Typography width={200} textAlign='center'>
                      {saida.acao}
                    </Typography>
                    <Typography width={150} textAlign='center'>
                      {saida.data}
                    </Typography>
                    <Typography
                      width={150}
                      textAlign='center'
                      color={theme.colors.redPrimary}
                    >
                      {formatValue(saida.valorRetirado)}
                    </Typography>
                  </Grid>
                ))}
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      {open && (
        <ManualDonationModal isVisible={open} onClose={handleCloseModal} />
      )}

      {openModalRetirada && (
        <ReportWithdrawal
          isVisible={openModalRetirada}
          onClose={handleCloseModalRetirada}
        />
      )}
    </Container>
  );
};

export default ResourcesApplication;
