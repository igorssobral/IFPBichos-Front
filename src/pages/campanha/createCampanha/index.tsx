import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { Container } from "../../../components/ui/container";
import { Title } from "../../../components/ui/tittle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FormLabel } from "../../../components/ui/formLabel";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { Navbar } from "../../../components/layout/navbar";
import CustomTextField from "../../../components/ui/customTextField";

interface campaignForm {
  title: string;
  description: string;
  fundraisingGoal: number | string;
  startDate: Date | string;
  finishedDate: Date | string;
  image: File | null;
}

export const CreateCampanha = () => {
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

  return (
    <>
      <Navbar title=" " visible visibleMenu={false} />
      <div className="content">
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
            onClick={() => {
              console.log(campaignForm);
            }}
          />
          <Button
            label="cancelar"
            width=""
            headlight={false}
            onClick={handleCancelClick}
          />
        </ButtonGroup>
      </div>
    </>
  );
};
