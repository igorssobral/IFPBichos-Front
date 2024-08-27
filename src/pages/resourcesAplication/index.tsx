/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  Slide,
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
import { ButtonGroup } from '../../components/ui/button-group';
import { TransitionProps } from '@mui/material/transitions';
import CustomTextField from '../../components/ui/customTextField';

dayjs.locale('pt-br');

const ResourcesApplication = () => {
  const [month, setMonth] = useState<Dayjs | null>(dayjs().startOf('month'));
  const { undirectedBalance, campaignsBalance } = useBalance();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [openModalRetirada, setOpenModalRetirada] = useState(false);
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

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });

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
        <React.Fragment>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle
              id='responsive-dialog-title'
              textAlign={'center'}
              color={theme.colors.primary}
            >
              {'Informar Valor'}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <form action=''>
                <Box display={'flex'} flexDirection={'column'}>
                  <CustomTextField type='text' label='Ação' id='acao' />
                  <CustomTextField
                    type='text'
                    label='Motivação'
                    id='motivation'
                    multiline
                    height='100px'
                    minRows={4}
                    maxRows={4}
                  />
                  <CustomTextField
                    type='text'
                    label='Valor Arrecadado'
                    id='value'
                    placeholder='R$'
                  />
                </Box>
                <DialogActions>
                  <ButtonGroup>
                    <Button
                      label='Salvar'
                      headlight
                      width='100px'
                      onClick={() => {}}
                    />
                    <Button
                      label='Cancelar'
                      width='100px'
                      onClick={() => setOpen(false)}
                    />
                  </ButtonGroup>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
      {openModalRetirada && (
        <React.Fragment>
          <Dialog
            open={openModalRetirada}
            onClose={() => setOpenModalRetirada(false)}
            fullWidth
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle
              id='responsive-dialog-title'
              textAlign={'center'}
              color={theme.colors.redPrimary}
            >
              {'Informar Retirada'}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <form action=''>
                <Box display={'flex'} flexDirection={'column'}>
                  <CustomTextField type='text' label='Campanha' id='acao' />
                  <CustomTextField
                    type='text'
                    label='Ação'
                    id='motivation'
                    multiline
                    height='100px'
                    minRows={4}
                    maxRows={4}
                  />
                  <CustomTextField
                    type='text'
                    label='Valor'
                    id='value'
                    placeholder='R$'
                  />
                  <CustomTextField
                    type='file'
                    label='Comprovante'
                    id='value'
                    placeholder='R$'
                  />
                </Box>
                <DialogActions>
                  <ButtonGroup>
                    <Button
                      label='Salvar'
                      headlight
                      width='100px'
                      onClick={() => {}}
                    />
                    <Button
                      label='Cancelar'
                      width='100px'
                      onClick={() => setOpenModalRetirada(false)}
                    />
                  </ButtonGroup>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      )}
    </Container>
  );
};

export default ResourcesApplication;
