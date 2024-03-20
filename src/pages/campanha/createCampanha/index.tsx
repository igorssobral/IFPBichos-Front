import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Title } from "../../../components/ui/tittle";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import CustomTextField from "../../../components/ui/customTextField";
import { ApiCampaign } from "../../../services/data-base/CampaignService";
import { Box } from "@mui/material";
import ButtonAppBar from "../../../components/layout/appBar";
import AlertMessage from "../../../components/layout/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CreateCampaignSchema, createCampaignSchema } from "./schema";

export const CreateCampanha = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
  });

  console.log("campaign:", errors);

  const { saveCampaign } = ApiCampaign();
  const [createSucess, setCreateSucess] = useState(false);

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/campanhas");
  };

  async function handleSaveCampaign(campaign: CreateCampaignSchema) {
    const Res = saveCampaign({
      start: campaign.startDate,
      end: campaign.finishedDate,
      title: campaign.title,
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
      <ButtonAppBar title=" " visible />
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
                  helperText={errors?.description?.message}
                  
                  {...field}
                />
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
