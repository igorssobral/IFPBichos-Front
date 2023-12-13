import React, { useState } from "react";
import "./styles.css";
import { Container } from "../../../components/ui/container";
import { Title } from "../../../components/ui/tittle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FormLabel } from "../../../components/ui/formLabel";
import { Button } from "../../../components/ui/button";
import { ButtonGroup } from "../../../components/ui/button-group";

interface campaignForm {
  title: string;
  description: string;
  fundraisingGoal: number;
  startDate: Date;
  finishedDate: Date;
  image: File;
}

export const EditCampanha = () => {
  const [campaignForm, setCampaignForm] = useState<campaignForm>();

  return (
    <div className="content">
      <Container>
        <Title label="Editar Campanha" />
        <FormControl>
          <FormLabel label="Titulo" htmlFor="title" />

          <TextField
            id="title"
            label="Digite o titulo"
            variant="outlined"
            size="small"
            type={"email"}
            // value={""}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
          <FormLabel label="Descrição" htmlFor="description" />

          <TextField
            id="description"
            label="Digite uma descrição"
            variant="outlined"
            size="small"
            type={"text"}
            // value={""}

            InputProps={{
              style: {
                width: "250px",
                height: "100px",
                borderRadius: "15px",
              },
            }}
          />
          <FormLabel label="Meta de arrecadação" htmlFor="meta" />

          <TextField
            id="meta"
            label="Digite a meta"
            placeholder="R$"
            variant="outlined"
            size="small"
            type={"number"}
            // value={}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
          <FormLabel label="Data Início" htmlFor="date-start" />

          <TextField
            id="date-start"
            label=" "
            InputLabelProps={{ shrink: false }}
            variant="outlined"
            size="small"
            type={"date"}
            // value={""}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
          <FormLabel label="Data Final" htmlFor="data-finish" />

          <TextField
            id="date-finish"
            label=" "
            InputLabelProps={{ shrink: false }}
            variant="outlined"
            size="small"
            type={"date"}
            // value={""}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
          <FormLabel label="Imagem" htmlFor="image" />

          <TextField
            id="image"
            label=" "
            InputLabelProps={{ shrink: false }}
            variant="outlined"
            size="small"
            type={"file"}
            fullWidth
            // value={""}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
        </FormControl>
        <ButtonGroup>
          <Button label="salvar" width="120px" headlight onClick={() => {}} />
          <Button
            label="cancelar"
            width=""
            headlight={false}
            onClick={() => {}}
          />
        </ButtonGroup>
      </Container>
    </div>
  );
};
