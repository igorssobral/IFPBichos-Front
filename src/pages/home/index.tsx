import "./styles.css";

import { Box, Container, Grid, ListItem, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import AlertMessage from "../../components/layout/alert";
import { ApiCampaign } from "../../services/data-base/CampaignService";
import ButtonAppBar from "../../components/layout/appBar";
import { CampaignRaw } from "../../services/@types/campaign";
import { CardModal } from "../../components/ui/card";
import CustomTextField from "../../components/ui/customTextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ResponsiveDialog from "../../components/ui/deleteAaction";
import SearchIcon from "@mui/icons-material/Search";
import SelectSmall from "../../components/ui/selectFilter";
import { getLocalStorage } from "../../utils/local-storage";

export const Home = () => {
  const { getAllCampaigns, deleteCampaign } = ApiCampaign();
  const [campaigns, setCampaigns] = useState<CampaignRaw[]>();
  const [deleteSucess, setDeleteSucess] = useState(false);
  const [loggedSucess, setLoggedSucess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [idDelete, setidDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchCampaigns() {
    const data = await getAllCampaigns();
    setCampaigns(data);
  }

  useEffect(() => {
    (async () => {
      fetchCampaigns();
      setidDelete(null);
    })();
  }, [deleteSucess]);

  useEffect(() => {
    const additionalData = location.state;
    if (additionalData) {
      setLoggedSucess(additionalData.isLogged);
    } else {
      setLoggedSucess(false);
    }
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/editcampanha/${id}`);
  };
  function handleChecked() {
    setIsChecked(false);
    fetchCampaigns();
    
  }
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
       
      setCampaigns(sortByRevenueDesc());
    
    
  };

  const handleViewCampaign = (id: string) => {
    const obj = campaigns?.find((campaign) => campaign.id === id);

    if (obj) {
      const serializedObj = JSON.stringify(obj);

      const encodedObj = encodeURIComponent(serializedObj);

      navigate(`/view-campaign/${encodedObj}`);
    } else {
      console.error(`Nenhuma campanha encontrada com o ID ${id}`);
    }
  };

  async function handleDelete(id: string) {
    const data = await deleteCampaign(`${id}`);
    setDeleteSucess(!deleteSucess);
    setidDelete(null);
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredCampaigns =
    search != ""
      ? campaigns?.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
      : campaigns;

  const sortByRevenueDesc = () => {
    return campaigns?.sort((a, b) => (b.balance / b.collectionGoal * 100) - (a.balance / a.collectionGoal * 100));
  };

  return (
    <Container>
      <ButtonAppBar title="Campanhas" visible />
      {loggedSucess && getLocalStorage() && (
        <AlertMessage
          isVisible
          setVisible={() => setLoggedSucess(false)}
          message={`Bem Vindo  ${getLocalStorage().user}`}
          title="Sucesso"
        />
      )}

      <Grid
        className="filters"
        flexDirection={{ xs: "column", md: "row", lg: "row" }}
      >
        <Grid
          display={"flex"}
          alignItems={{ lg: "center", xs: "start" }}
          flexDirection={{ xs: "column", md: "row", lg: "row" }}
          justifyContent={"start"}
        >
          <Grid>
            <ListItem>
              {" "}
              Filtros:
              <SelectSmall />
            </ListItem>
          </Grid>
          <Grid>
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

          <Grid marginLeft={1}>
            <ListItem>
              <FormControlLabel
                value="start"
                control={<DeleteForeverIcon color="action" />}
                label="Limpar Filtros"
                onClick={handleChecked}
              />
            </ListItem>
          </Grid>
        </Grid>

        <Grid>
          <ListItem>
            <CustomTextField
              label=" "
              title=""
              onChange={handleSearch}
              inputLabelProps={false}
              placeholder="pesquise por campanhas"
              id="title"
              type={"text"}
              width="300px"
              height="30px"
            />
            <SearchIcon
              fontSize="medium"
              color="disabled"
              sx={{ position: "absolute", right: "20px" }}
            />
          </ListItem>
        </Grid>
        {deleteSucess && (
          <AlertMessage
            isVisible
            setVisible={() => setDeleteSucess(false)}
            message="Campanha excluida com sucesso!"
            title="Sucesso"
          />
        )}
      </Grid>

      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          display={"grid"}
          width={{ xs: "100%", lg: "100%" }}
          marginBottom={5}
          justifyItems={"center"}
          gridTemplateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={5}
        >
          {filteredCampaigns?.map((campaign) => (
            <CardModal
              key={campaign.id}
              campaign={campaign}
              onEdit={handleEdit}
              onView={handleViewCampaign}
              onDelete={() => setidDelete(campaign.id)}
            />
          ))}
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
        <Typography width={300} mx={{ lg: "40%", xs: "20%" }}>
          Nenhuma campanha encontrada
        </Typography>
      )}
    </Container>
  );
};
