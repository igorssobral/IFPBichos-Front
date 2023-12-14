import React, { useState } from "react";
import "./styles.css";
import { Title } from "../../../components/ui/tittle";
import FormControl from "@mui/material/FormControl";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/ui/customTextField";
import { Box } from "@mui/material";
import ButtonAppBar from "../../../components/layout/appBar";

interface campaignForm {
  title: string;
  description: string;
  fundraisingGoal: number | string;
  startDate: Date | string;
  finishedDate: Date | string;
  image: File | null;
}

export const EditCampanha = () => {
  const [campaignForm, setCampaignForm] = useState<campaignForm>({
    title: "",
    description: "",
    fundraisingGoal: "",
    startDate: "",
    finishedDate: "",
    image: null,
  });
  const handleChange = (field: keyof campaignForm, value: any) => {
    console.log(`Changing ${field} to ${value}`);
    setCampaignForm((prev) => ({ ...prev, [field]: value }));
  };


  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/campanhas');
  };

  return (
    <>
     <ButtonAppBar title="" visible visibleMenu={false}/>
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
          <Button label="salvar" width="120px" headlight onClick={() => {console.log(campaignForm)}} />
          <Button
            label="cancelar"
            width=""
            headlight={false}
            onClick={handleCancelClick}
          />
        </ButtonGroup>
      
    </Box>
    </>
  );
};
