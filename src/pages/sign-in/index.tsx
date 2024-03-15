import React, { useState } from "react";
import "./styles.css";
import { ContainerModal } from "../../components/ui/container";
import { Button } from "../../components/ui/button";
import { Title } from "../../components/ui/tittle";
import { useNavigate } from "react-router";
import CustomTextField from "../../components/ui/customTextField";
import { Box } from "@mui/material";
import ButtonAppBar from "../../components/layout/appBar";
import { login } from "../../services/auth";
import AlertMessage from "../../components/layout/alert";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "./schema";

export const Login = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [errorlogin, setErrorlogin] = useState(false);

  const navigate = useNavigate();

  async function authenticate(data: LoginSchema) {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      handleCancelClick();
    } catch (error) {
      setErrorlogin(true);
      console.log(error);
    }
  }
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    authenticate(data);
  };

  const handleCancelClick = () => {
    const additionalData = {
      key: "value",
      isLogged: true,
    };
    navigate("/campanhas", { state: additionalData });
  };

  return (
    <>
      <ButtonAppBar title="" visible={false} />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {errorlogin && (
          <AlertMessage
            isVisible
            setVisible={() => setErrorlogin(false)}
            severity="error"
            message="Email ou Senha incorretos!"
            title="Error"
          />
        )}
        <ContainerModal>
          <Title label="Login"></Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={"flex"} flexDirection={"column"}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CustomTextField
                    id="email"
                    title="Email"
                    label="Digite seu email"
                    type="text"
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    id="password"
                    title="Senha"
                    label="Digite sua senha"
                    type="password"
                    helperText={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <Button label="Entrar" width="300px" type="submit" headlight />
              <span className="span_login">Esqueceu sua senha?</span>
            </Box>
          </form>
        </ContainerModal>
      </Box>
    </>
  );
};
