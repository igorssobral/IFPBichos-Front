import React, { useState, useEffect } from "react";
import "./styles.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import SelectSmall from "../../components/ui/selectFilter";
import { Box, Container, Grid, ListItem } from "@mui/material";
import { CardModal } from "../../components/ui/card";
import ButtonAppBar from "../../components/layout/appBar";
import CustomTextField from "../../components/ui/customTextField";
import { CampaignRaw } from "../../services/@types/campaign";
import { ApiCampaign } from "../../services/data-base/CampaignService";
import ResponsiveDialog from "../../components/ui/deleteAaction";
import { getLocalStorage } from "../../utils/local-storage";
import { useLocation, useNavigate } from "react-router";
import AlertMessage from "../../components/layout/alert";

export const Home = () => {
  const { getAllCampaigns, deleteCampaign } = ApiCampaign();
  const [campaigns, setCampaigns] = useState<CampaignRaw[]>();
  const [deleteSucess, setDeleteSucess] = useState(false);
  const [loggedSucess, setLoggedSucess] = useState(false);
  const [idDelete, setidDelete] = useState<string | null>(null);
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

  async function handleDelete(id: string) {
    const data = await deleteCampaign(`${id}`);
    setDeleteSucess(!deleteSucess);
    setidDelete(null);
  }

  return (
    <>
      <ButtonAppBar title="Campanhas" visible />
      {loggedSucess && (
        <AlertMessage
          isVisible
          setVisible={() => setLoggedSucess(false)}
          message={`Bem Vindo${
            getLocalStorage() ? getLocalStorage().email : ""
          }`}
          title="Sucesso"
        />
      )}

      <Grid className="filters">
        <Grid xs>
          <ListItem>
            {" "}
            Filtros:
            <SelectSmall />
          </ListItem>
        </Grid>
        <Grid xs>
          <ListItem>
            <FormControlLabel
              value="end"
              control={<Radio />}
              label="Próximo da meta"
            />
          </ListItem>
        </Grid>

        <Grid xs>
          <ListItem>
            <FormControlLabel
              value="start"
              control={<DeleteForeverIcon color="disabled" />}
              label="Limpar Filtros"
            />
          </ListItem>
        </Grid>
        <Grid xs>
          <ListItem>
            <CustomTextField
              label=" "
              title=""
              value={""}
              onChange={() => {}}
              inputLabelProps={false}
              id="title"
              type={"text"}
              width="200px"
              height="35px"

              // value={""}
            />
            <SearchIcon fontSize="large" color="disabled" />
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
          style={{
            display: "grid",
            gap: "50px",
            gridTemplateColumns: "repeat(3,1fr)",
          }}
        >
          {campaigns?.map((campaign) => (
            <CardModal
              key={campaign.id}
              campaign={campaign}
              onEdit={handleEdit}
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
    </>
  );
};
