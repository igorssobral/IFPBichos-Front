/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Drawer,
  Grid,
  ListItem,
  Pagination,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiCampaign } from '../../services/data-base/CampaignService';
import ButtonAppBar from '../../components/layout/appBar';
import { CampaignRaw } from '../../services/@types/campaign';
import { CardModal } from '../../components/ui/card';
import CustomTextField from '../../components/ui/customTextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ResponsiveDialog from '../../components/ui/deleteAaction';
import SearchIcon from '@mui/icons-material/Search';
import SelectSmall from '../../components/ui/selectFilter';
import { isWelcomeShown, setWelcomeShown } from '../../utils/local-storage';
import usePagination from '../../hooks/pagination';
import { filtersStyle, stylePagination } from './style';
import { useAuth } from '../../context/auth-context';
import { ResponsePayment } from '../../services/@types/response-payment';
import { ApiPayment } from '../../services/data-base/payment-service';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/button';

export const Home = () => {
  const { user } = useAuth();

  const { getAllCampaigns, deleteCampaign } = ApiCampaign();
  const { updatePayment } = ApiPayment();
  const [campaigns, setCampaigns] = useState<CampaignRaw[]>([]);
  const [campaignsCopy, setCampaignsCopy] = useState<CampaignRaw[]>();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [idDelete, setidDelete] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('TODOS');
  const [page, setPage] = useState(1);
  const [responsePayment, setResponsePayment] = useState<ResponsePayment>({
    paymentId: '',
    status: '',
    paymentType: '',
    preferenceId: '',
  });

  const PER_PAGE = 12;
  const totalPages = Math.ceil(campaigns?.length / PER_PAGE);
  const navigate = useNavigate();

  //função que recebe os dados do componente <Pagination/>
  const handleChangePage = (_e: unknown, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  async function fetchCampaigns() {
    const data = await getAllCampaigns();
    if (data) {
      setCampaigns(data);
      setCampaignsCopy(data);
    }
  }
  //Carrega as campanhas salvas chamando a função fetchCampaigns()
  useEffect(() => {
    (async () => {
      fetchCampaigns();
      setidDelete(null);
    })();
  }, []);

  useEffect(() => {
    const urlObj = new URL(window.location.href);
    const params = new URLSearchParams(urlObj.search);

    const paymentId = params.get('payment_id') || '';
    const status = params.get('status') || '';
    const paymentType = params.get('payment_type') || '';
    const preferenceId = params.get('preference_id') || '';

    setResponsePayment({
      paymentId: paymentId,
      status: status,
      paymentType: paymentType,
      preferenceId: preferenceId,
    });
  }, []);

  useEffect(() => {
    const updatePay = async () => {
      if (responsePayment.paymentId && responsePayment.status === 'approved') {
        try {
          await updatePayment(responsePayment);
        } catch (error) {}
      }
    };
    updatePay();
  }, [responsePayment]);

  //verifica se tem algum o usuario logado
  useEffect(() => {
    if (user && !isWelcomeShown()) {
      setWelcomeShown();
      toast.success(`Bem Vindo! ${user.user}`);
    }
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/editcampanha/${id}`);
  };

  //função pra resetar os filtros
  function resetFilters() {
    setSearch('');
    if (isChecked) {
      setIsChecked(false);
      fetchCampaigns();
    }
    if (selectedFilter !== 'TODOS') {
      setSelectedFilter('TODOS');
      handleFilterByType('TODOS');
    }
  }

  //função de filtro de pesquisa
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  //função que filtra por tipo de animal
  function handleFilterByType(animal: string) {
    if (animal == 'TODOS') {
      setCampaigns(campaignsCopy || []);
    } else {
      const filteredCampaigns = (campaignsCopy || []).filter(
        (campaign) => campaign.animal === animal
      );
      setCampaigns(filteredCampaigns);
    }
  }

  //função que filtra por proximo da meta
  function sortByRevenueDesc() {
    if (selectedFilter !== 'TODOS') {
      const filteredCampaigns = campaigns?.sort(
        (a, b) => b.collectionPercentage - a.collectionPercentage
      );
      setCampaigns(filteredCampaigns);
    } else {
      const filteredCampaigns = (campaignsCopy || []).sort(
        (a, b) => b.collectionPercentage - a.collectionPercentage
      );
      setCampaigns(filteredCampaigns);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    sortByRevenueDesc();
  };

  //função pra visualizar detalhes de uma campanha
  const handleViewCampaign = (id: string) => {
    navigate(`/view-campaign/${id}`);
  };

  //função pra deletar uma campanha
  async function handleDelete(id: string) {
    await deleteCampaign(`${id}`)
      .then(() => {
        toast.success('Campanha excluída com sucesso!');
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao tentar excluir essa campanha');
      });
    setidDelete(null);

    fetchCampaigns();
  }

  const filteredCampaigns =
    search != ''
      ? campaigns?.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
      : campaigns;

  //uso do hook de paginação
  const _DATA = usePagination(filteredCampaigns, PER_PAGE);

  return (
    <Container>
      <ButtonAppBar title='Campanhas' visible />
      <Grid style={filtersStyle} container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Button
       label='Filtros'
        onClick={() => setFilterOpen(true)}
        sx={{ display: { xs: 'block', md: 'none' } }} 
      >
        Filtros
      </Button>

      <Drawer
        anchor="bottom"
        open={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        
      >
        <Box p={2}>
          <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={6}>
              <ListItem>
                Filtros:
                <SelectSmall
                  handleFilter={(value) => {
                    setSelectedFilter(value);
                    handleFilterByType(value);
                    setIsChecked(false);
                  }}
                  selectedValue={selectedFilter}
                />
              </ListItem>
            </Grid>
            
            <Grid item xs={7}>
              <ListItem>
                <FormControlLabel
                  value="end"
                  control={
                    <Radio
                      checked={isChecked}
                      color="success"
                      onChange={handleChange}
                    />
                  }
                  label="Próximo da meta"
                />
              </ListItem>
            </Grid>
            <Grid item xs={12}>
              <ListItem>
                <FormControlLabel
                  value="start"
                  control={<DeleteForeverIcon color="action" />}
                  label="Limpar Filtros"
                  onClick={resetFilters}
                />
              </ListItem>
            </Grid>
          </Grid>
        </Box>
      </Drawer>

      <Grid
        flexDirection={{ xs: 'column', md: 'row', lg: 'row' }}
        display={{xs:'none', md:'flex'}}
      >
        <Grid
          display={'flex'}
          width={'100%'}
          alignItems={{ lg: 'center', xs: 'center' }}
          flexDirection={{  md: 'row', lg: 'row' }}
          container
          spacing={{xs: 2,md:3}}
          
        >
          <Grid item xs={7} md={3}>
            <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
              Filtros:
              <SelectSmall
                handleFilter={(value) => {
                  setSelectedFilter(value);
                  handleFilterByType(value);
                  setIsChecked(false);
                }}
                selectedValue={selectedFilter}
              />
            </ListItem>
          </Grid>
          <Grid  item xs={5} md={5}>
            <ListItem >
              <FormControlLabel
                value='end'
                control={
                  <Radio
                    checked={isChecked}
                    color='success'
                    onChange={handleChange}
                  />
                }
                label='Próximo da meta'
              />
            </ListItem>
          </Grid>

          <Grid item mx={{xs:'auto'}}  md={4}>
            <ListItem>
              <FormControlLabel
                value='start'
                control={<DeleteForeverIcon color='action' />}
                label='Limpar Filtros'
                onClick={resetFilters}
              />
            </ListItem>
          </Grid>
        </Grid>

        
      </Grid>

      <Grid width={{xs:'70%',md:'max-content'}} >
          <ListItem >
            <CustomTextField
              label=''
              title=''
              onChange={handleSearch}
              placeholder='pesquise por campanhas'
              id='title'
              type={'text'}
              focused={false}
              fontSize='13px'
              fullWidth
              
            />
            <SearchIcon
              fontSize='small'
              color='disabled'
              sx={{ position: 'absolute', right: '20px' }}
            />
          </ListItem>
        </Grid>
    </Grid>

      <Container style={stylePagination}>
        <Pagination
          count={totalPages}
          variant='outlined'
          style={{ color: 'red' }}
          size='medium'
          shape='rounded'
          page={page}
          onChange={handleChangePage}
        />
      </Container>

      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          display={'grid'}
          width={{ xs: '100%', lg: '100%' }}
          justifyItems={'center'}
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={5}
        >
          {Array.isArray(_DATA?.currentData()) &&
            _DATA?.currentData().map((campaign) => {
              return (
                <CardModal
                  key={campaign.id}
                  campaign={campaign}
                  onEdit={handleEdit}
                  onView={handleViewCampaign}
                  onDelete={() => setidDelete(campaign.id)}
                />
              );
            })}
        </Box>

        {idDelete && (
          <ResponsiveDialog
            isVisible={idDelete != null}
            handleClosed={() => setidDelete(null)}
            handleDelete={() => handleDelete(idDelete)}
          />
        )}
      </Container>
      {filteredCampaigns?.length === 0 && (
        <Typography width={300} mx={{ lg: '40%', xs: '20%' }}>
          Nenhuma campanha encontrada
        </Typography>
      )}

      {filteredCampaigns?.length !== 0 && (
        <Container style={stylePagination}>
          <Pagination
            count={totalPages}
            variant='outlined'
            size='medium'
            shape='rounded'
            page={page}
            onChange={handleChangePage}
          />
        </Container>
      )}
    </Container>
  );
};
