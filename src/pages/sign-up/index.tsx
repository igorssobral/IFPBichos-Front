import React, { useState } from "react";
import CustomTextField from "../../components/ui/customTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { ContainerModal } from "../../components/ui/container";
import { Box } from "@mui/material";
import { Title } from "../../components/ui/tittle";
import { SignUpSchema, signUpSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonAppBar from "../../components/layout/appBar";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/auth";

const SignUp = () => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleCancelClick = () => {
    const additionalData = {
      key: "value",
      isLogged: true,
    };
    navigate("/login");
  };

  const handleNextClick = async () => {
    const isValid = await trigger(["name", "cpf", "phone"]);

    if (isValid) {
      setShowAdditionalFields(!showAdditionalFields);
    }
  };

  function handleregister(register: SignUpSchema) {

    try {
      const data = signup({
      name: register.name,
      phoneNumber: register.phone,
      email: register.email,
      login: register.email,
      password: register.password,
      CPF: register.cpf,
    });
    handleCancelClick();
    } catch (error) {
      
    }
    
  }

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    handleregister(data);
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <>
      <ButtonAppBar title="" visible={false} />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <ContainerModal>
          <Title label="Cadastro"></Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display={"flex"} flexDirection={"column"}>
              {!showAdditionalFields && (
                <>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CustomTextField
                        id="name"
                        title="Nome"
                        label="Digite seu nome"
                        type="text"
                        helperText={errors.name?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="cpf"
                    render={({ field }) => (
                      <CustomTextField
                        id="cpf"
                        title="CPF"
                        label="Digite seu CPF"
                        type="text"
                        helperText={errors.cpf?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <CustomTextField
                        id="phone"
                        title="Telefone"
                        label="Digite seu telefone"
                        type="text"
                        helperText={errors.phone?.message}
                        {...field}
                      />
                    )}
                  />
                </>
              )}

              {showAdditionalFields && (
                <>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <CustomTextField
                        id="email"
                        title="Email"
                        label="Digite seu email"
                        type="email"
                        helperText={errors.email?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
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

                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <CustomTextField
                        id="confirmPassword"
                        title="Confirmar Senha"
                        label="Confirme sua senha"
                        type="password"
                        helperText={errors.confirmPassword?.message}
                        {...field}
                      />
                    )}
                  />
                </>
              )}

              <div className="buttons-signup">
                {!showAdditionalFields && (
                  <>
                    <Button
                      label="próximo"
                      width="150px"
                      type="button"
                      headlight
                      onClick={handleNextClick}
                    />

                    <Button
                      label="voltar"
                      width="150px"
                      onClick={handleBackClick}
                    />
                  </>
                )}
                {showAdditionalFields && (
                  <>
                    <Button
                      label="Cadastrar"
                      headlight
                      width="150px"
                      type="submit"
                    />
                    <Button
                      label="voltar"
                      width="150px"
                      onClick={handleNextClick}
                    />
                  </>
                )}
              </div>
            </Box>
          </form>
        </ContainerModal>
      </Box>
    </>
  );
};

export default SignUp;
