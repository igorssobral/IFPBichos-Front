import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateCampaignSchema, createCampaignSchema } from "./schema";
import React, { useState } from "react";

import AlertMessage from "../../../components/layout/alert";
import { ApiCampaign } from "../../../services/data-base/CampaignService";
import { Box, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "../../../components/ui/button";
import ButtonAppBar from "../../../components/layout/appBar";
import { ButtonGroup } from "../../../components/ui/button-group";
import CustomTextField from "../../../components/ui/customTextField";
import { Title } from "../../../components/ui/tittle";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateCampanha = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
  });

  const { saveCampaign } = ApiCampaign();
  const [createSucess, setCreateSucess] = useState(false);

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/campanhas");
  };

  async function handleSaveCampaign(campaign: CreateCampaignSchema) {
    console.log("🚀 ~ handleSaveCampaign ~ campaign:", campaign)
    const Res = saveCampaign({
      start: campaign.startDate,
      end: campaign.finishedDate,
      title: campaign.title,
      animal: campaign.animal,
      description: campaign.description,
      image: campaign.file,
      collectionGoal: campaign.fundraisingGoal,
    });
    setCreateSucess(true);

    console.log("🚀 ~ handleSaveCampaign ~ Res:", Res);
  }

  const onSubmit: SubmitHandler<CreateCampaignSchema> = (data) => {
    handleSaveCampaign(data);
  };

  return (
    <>
      <ButtonAppBar title="" visible />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Title label="Nova Campanha" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} flexDirection={"column"}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <CustomTextField
                  id="title"
                  label="Titulo"
                  placeholder="Digite o titulo"
                  type="text"
                  helperText={errors?.title?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: false }}
              render={({ field }) => (
                <CustomTextField
                  id="description"
                  label="Descrição"
                  placeholder="Digite uma descrição"
                  multiline
                  type="text"
                  height="100px"
                  minRows={4}
                  maxRows={4}
                  helperText={errors?.description?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="animal"
              render={({ field }) => (
                <>
                  <InputLabel sx={{ marginTop: "10px" }}>Animal</InputLabel>
                  <Select
                    value={field.value || "Selecione"}
                    placeholder="Selecione"
                    onChange={field.onChange}
                    error={!!errors.animal?.message}
                    sx={{ marginBottom: "10px", borderRadius: 2  }}
                  >
                    <MenuItem value={"Selecione"}>Selecione</MenuItem>
                    <MenuItem value={"GATO"}>Gato</MenuItem>
                    <MenuItem value={"CACHORRO"}>Cachorro</MenuItem>
                  </Select>
                  <FormHelperText error>{errors.animal?.message}</FormHelperText>

                </>
              )}
            />
            <Controller
              control={control}
              name="fundraisingGoal"
              render={({ field }) => (
                <CustomTextField
                  id="fundraisingGoal"
                  label="Meta de arrecadação"
                  placeholder="Digite uma meta"
                  type="number"
                  helperText={errors?.fundraisingGoal?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <CustomTextField
                  id="startDate"
                  label="Data Inicio"
                  type="date"
                  inputLabelProps={false}
                  helperText={errors?.startDate?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="finishedDate"
              render={({ field }) => (
                <CustomTextField
                  id="finishedDate"
                  label="Data Final"
                  type="date"
                  inputLabelProps={false}
                  helperText={errors?.finishedDate?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <CustomTextField
                  id="file"
                  label="Imagem"
                  type="file"
                  helperText={errors?.file?.message}
                  {...field}
                />
              )}
            />

            <ButtonGroup>
              <Button headlight label="Salvar" type="submit" />
              <Button
                label="cancelar"
                width=""
                headlight={false}
                onClick={handleCancelClick}
              />
            </ButtonGroup>
          </Box>
        </form>

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
