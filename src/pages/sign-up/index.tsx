/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CustomTextField from "../../components/ui/customTextField";
import { Controller, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { ContainerModal } from "../../components/ui/container";
import { Box } from "@mui/material";
import { Title } from "../../components/ui/tittle";
import { SignUpSchema, signUpSchema } from "../../schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonAppBar from "../../components/layout/appBar";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/auth";
import { toast } from 'react-toastify';
import { withMask } from 'use-mask-input';



interface SignUpFormProps {
  control: UseFormReturn<SignUpSchema>['control'];
  errors: any; 
  showAdditionalFields: boolean;
  handleSubmit: any; 
  onSubmit: (data: SignUpSchema) => void;
  handleNextClick: () => void;
  handleBackClick: () => void;
}

const renderTextField = (
  name: string,
  label: string,
  placeholder: string,
  type: string,
  errors: any,
  control: any,
  mask?: string | string[] 
) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <CustomTextField
        id={name}
        label={label}
        type={type}
        placeholder={placeholder}
        helperText={errors[name]?.message}
        inputRef={mask ? withMask(mask) : undefined} 
        {...field}
      />
    )}
  />
);
const SignUpForm: React.FC<SignUpFormProps> = ({
  control,
  errors,
  showAdditionalFields,
  handleSubmit,
  onSubmit,
  handleNextClick,
  handleBackClick,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Box display={"flex"} flexDirection={"column"}>
      {/* Campos principais */}
      {!showAdditionalFields && (
        <>
          {renderTextField("name", "Digite seu nome", "nome", "text", errors, control)}
          {renderTextField("CPF", "Digite seu CPF", "000.000.000-00", "text", errors, control,"999.999.999-99")}
          {renderTextField("phoneNumber", "Digite seu telefone", "(99) 99999-9999", "text", errors, control, "(99) 99999-9999")}
        </>
      )}

      {showAdditionalFields && (
        <>
          {renderTextField("email", "Digite seu email", "name@email.com", "email", errors, control)}
          {renderTextField("password", "Digite sua senha", "********", "password", errors, control)}
          {renderTextField("confirmPassword", "Confirme sua senha", "********", "password", errors, control)}
        </>
      )}

      <div className="buttons-signup">
        {!showAdditionalFields ? (
          <>
            <Button label="próximo" width="150px" type="button" headlight onClick={handleNextClick} />
            <Button label="voltar" width="150px" onClick={handleBackClick} />
          </>
        ) : (
          <>
            <Button label="Cadastrar" headlight width="150px" type="submit" />
            <Button label="voltar" width="150px" onClick={handleNextClick} />
          </>
        )}
      </div>
    </Box>
  </form>
);

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

  const handleNextClick = async () => {
    const isValid = await trigger(["name", "CPF", "phoneNumber"]);

    if (isValid) {
      setShowAdditionalFields(!showAdditionalFields);
    }
  };

  async function handleRegister(register: SignUpSchema) {
    await signup({
      ...register,
      login: register.email,
    })
      .then((response) => {
        navigate('/login')
        toast.success(response);
      })
      .catch((error)=>{
        toast.error(error);
      });
  }

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    handleRegister(data);
  };

  const handleBackClick = () => {
    navigate("/login");
  };

  return (
    <>
      <ButtonAppBar title="" visible={false} />
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <ContainerModal>
          <Title label="Cadastro" />

          <SignUpForm
            control={control}
            errors={errors}
            showAdditionalFields={showAdditionalFields}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleNextClick={handleNextClick}
            handleBackClick={handleBackClick}
          />
          
        </ContainerModal>
      </Box>
    </>
  );
};

export default SignUp;