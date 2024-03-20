import React, { useState, useEffect } from "react";
import { Title } from "../../../components/ui/tittle";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";
import { useNavigate, useParams } from "react-router";
import CustomTextField from "../../../components/ui/customTextField";
import { Box } from "@mui/material";
import ButtonAppBar from "../../../components/layout/appBar";
import { ApiCampaign } from "../../../services/data-base/CampaignService";
import { formatInputDate } from "../../../utils/format-date";
import AlertMessage from "../../../components/layout/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createCampaignSchema } from "../createCampanha/schema";

interface campaignForm {
  title: string;
  fundraisingGoal: number;
  description: string;
  startDate: string;
  finishedDate: string;
  file: File | null;
}

export const EditCampanha = () => {
  const { getCampaignById, updateCampaign } = ApiCampaign();
  const [editSucess, setEditsucess] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<campaignForm>({
    resolver: zodResolver(createCampaignSchema),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await getCampaignById(`${id}`);

      if (data) {
        setValue("title", data.title);
        setValue("description", data.description);
        setValue("fundraisingGoal", data.collectionGoal);
        setValue("startDate", formatInputDate(data.start));
        setValue("finishedDate", formatInputDate(data.end));
      }
    })();
  }, []);

  async function updateCurrencyCampaign(updatedCampaign: any) {
    const data = await updateCampaign(`${id}`, updatedCampaign);
    setEditsucess(true);
  }

  const onSubmit: SubmitHandler<campaignForm> = (data) => {
    updateCurrencyCampaign(data);
  };

  const handleCancelClick = () => {
    navigate("/campanhas");
  };

  return (
    <>
      <ButtonAppBar title="" visible />

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Title label="Editar Campanha" />
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
                  title="Imagem"
                  label=" "
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
