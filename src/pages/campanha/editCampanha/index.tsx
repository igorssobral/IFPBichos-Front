import React, { useState, useEffect } from "react";
import { Title } from "../../../components/ui/tittle";
import FormControl from "@mui/material/FormControl";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useNavigate, useParams } from "react-router";
import CustomTextField from "../../../components/ui/customTextField";
import { Box } from "@mui/material";
import ButtonAppBar from "../../../components/layout/appBar";
import { ApiCampaign } from "../../../services/data-base/CampaignService";
import { formatInputDate } from "../../../utils/format-date";
import AlertMessage from "../../../components/layout/alert";

interface campaignForm {
  title: string;
  collectionGoal: number;
  description: string;
  start: string;
  end: string;
  image: File | null;
}

export const EditCampanha = () => {
  const { getCampaignById, updateCampaign } = ApiCampaign();
  const [editSucess, setEditsucess] = useState(false);
  const [campaignForm, setCampaignForm] = useState<campaignForm>({
    collectionGoal: 0,
    description: "",
    end: "",
    image: null,
    start: "",
    title: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (field: keyof campaignForm, value: any) => {
    console.log(`Changing ${field} to ${value}`);
    setCampaignForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    (async () => {
      const data = await getCampaignById(`${id}`);

      if (data) {
        const currencyCampaign = data;
        const formattedCampaign = {
          ...currencyCampaign,
          start: formatInputDate(currencyCampaign.start),
          end: formatInputDate(currencyCampaign.end),
        };

        setCampaignForm(formattedCampaign);
      }
    })();
  }, []);

  async function updateCurrencyCampaign(updatedCampaign: any) {
    const data = await updateCampaign(`${id}`, updatedCampaign);
    setEditsucess(true);
  }

  const handleCancelClick = () => {
    navigate("/campanhas");
  };

  return (
    <>
      <ButtonAppBar title="" visible  />

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Title label="Editar Campanha" />
        <FormControl>
          <CustomTextField
            id="title"
            title="Titulo"
            label="Digite o titulo"
            type="text"
            value={campaignForm.title}
            onChange={(value) => handleChange("title", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="description"
            title="Descrição"
            label="Digite uma descrição"
            type="text"
            multiline
            height="100px"
            value={campaignForm.description}
            onChange={(value) => handleChange("description", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="collectionGoal"
            title="Meta de arrecadação"
            label="Digite uma meta"
            placeholder="R$"
            type="number"
            value={campaignForm.collectionGoal}
            onChange={(value) => handleChange("collectionGoal", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="start"
            title="Data Inicio"
            label=" "
            type="date"
            inputLabelProps={false}
            value={campaignForm.start}
            onChange={(value) => handleChange("start", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="end"
            title="Data Final"
            label=" "
            type="date"
            inputLabelProps={false}
            value={campaignForm.end}
            onChange={(value) => handleChange("end", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="image"
            title="Imagem"
            label=" "
            type="file"
            value={null}
            onChange={(value) => handleChange("image", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
        </FormControl>
        <ButtonGroup>
          <Button
            label="salvar"
            width="120px"
            headlight
            onClick={() => updateCurrencyCampaign(campaignForm)}
          />
          <Button
            label="cancelar"
            width=""
            headlight={false}
            onClick={handleCancelClick}
          />
        </ButtonGroup>

        {editSucess && (
          <AlertMessage
            isVisible
            setVisible={handleCancelClick}
            message="Campanha editada com sucesso!"
            title="Sucesso"
          />
        )}
      </Box>
    </>
  );
};
