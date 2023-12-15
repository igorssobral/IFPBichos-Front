import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Title } from "../../../components/ui/tittle";
import FormControl from "@mui/material/FormControl";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import CustomTextField from "../../../components/ui/customTextField";
import { ApiCampaign } from "../../../services/data-base/CampaignService";
import { Box } from "@mui/material";
import ButtonAppBar from "../../../components/layout/appBar";
import AlertMessage from "../../../components/layout/alert";

interface campaignForm {
  title: string;
  description: string;
  fundraisingGoal: number | string;
  startDate: Date | string;
  finishedDate: Date | string;
  image: File | null;
}

export const CreateCampanha = () => {
  const { saveCampaign } = ApiCampaign();
  const [createSucess, setCreateSucess] = useState(false);
  const [campaignForm, setCampaignForm] = useState<campaignForm>({
    title: "",
    description: "",
    fundraisingGoal: "",
    startDate: "",
    finishedDate: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/campanhas");
  };

  const handleChange = (field: keyof campaignForm, value: any) => {
    console.log(`Changing ${field} to ${value}`);
    setCampaignForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSaveCampaign(campaign: campaignForm) {
    const Res = saveCampaign({
      start: campaign.startDate,
      end: campaign.finishedDate,
      title: campaign.title,
      description: campaign.description,
      image: campaign.image,
      collectionGoal: campaign.fundraisingGoal,
    });
    setCreateSucess(true);
  }

  return (
    <>
      <ButtonAppBar title=" " visible />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Title label="Nova Campanha" />
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
            multiline
            type="text"
            height="100px"
            value={campaignForm.description}
            onChange={(value) => handleChange("description", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="fundraisingGoal"
            title="Meta de arrecadação"
            label="Digite uma meta"
            placeholder="R$"
            type="number"
            value={campaignForm.fundraisingGoal}
            onChange={(value) => handleChange("fundraisingGoal", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="startDate"
            title="Data Inicio"
            label=" "
            type="date"
            inputLabelProps={false}
            value={campaignForm.startDate}
            onChange={(value) => handleChange("startDate", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="finishedDate"
            title="Data Final"
            label=" "
            type="date"
            inputLabelProps={false}
            value={campaignForm.finishedDate}
            onChange={(value) => handleChange("finishedDate", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
          <CustomTextField
            id="image"
            title="Imagem"
            label=" "
            type="file"
            value={campaignForm.image}
            onChange={(value) => handleChange("image", value)}
            textFieldProps={{ InputProps: { disableUnderline: true } }}
          />
        </FormControl>
        <ButtonGroup>
          <Button
            label="salvar"
            width="120px"
            headlight
            onClick={() => handleSaveCampaign(campaignForm)}
          />
          <Button
            label="cancelar"
            width=""
            headlight={false}
            onClick={handleCancelClick}
          />
        </ButtonGroup>

        {createSucess && (
          <AlertMessage
            isVisible
            setVisible={handleCancelClick}
            message="Campanha criada com sucesso!"
            title="Sucesso"
          />
        )}
      </Box>
    </>
  );
};
