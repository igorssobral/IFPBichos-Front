import React, { useState } from "react";
import "./styles.css";
import { ContainerModal } from "../../components/ui/container";
import FormControl from "@mui/material/FormControl";
import { Button } from "../../components/ui/button";
import { Title } from "../../components/ui/tittle";
import { useNavigate } from "react-router";
import CustomTextField from "../../components/ui/customTextField";
import { Box } from "@mui/material";
import ButtonAppBar from "../../components/layout/appBar";
// import { GoogleAuth } from "../../components/layout/googlelogin";
import { login } from "../../services/auth";
import { Credentials } from "../../services/@types/auth";
import AlertMessage from "../../components/layout/alert";

interface user {
  email: string;
  password: string;
}

export const Login = () => {
  const [errorlogin, setErrorlogin] = useState(false);
  const [user, setUser] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function authenticate(data: Credentials) {
    if (validateForm()) {
      try {
        const response = await login(data);
        console.log(response);
        handleCancelClick();
      } catch (error) {
        setErrorlogin(true);
        console.log(error);
      }
    } else {
      setErrorlogin(true);
      console.log("Formulário inválido, corrija os erros.");
    }
  }

  const handleCancelClick = () => {
    const additionalData = {
      key: "value",
      isLogged: true,
    };
    navigate("/campanhas", { state: additionalData });
  };
  
  const handleChange = (field: keyof user, value: any) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    let isValid = true;

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Digite um e-mail válido",
      }));
      isValid = false;
    }

    if (!user.password || user.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "A senha deve ter pelo menos 6 caracteres",
      }));
      isValid = false;
    }

    return isValid;
  };

  return (
    <>
      <ButtonAppBar title="" visible={false}/>
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

          <FormControl>
            <CustomTextField
              id="email"
              title="Email"
              label="Digite seu email"
              type="text"
              value={user.email}
              error={errors.email}
              onChange={(value) => handleChange("email", value)}
              textFieldProps={{ InputProps: { disableUnderline: true } }}
            />
            <CustomTextField
              id="password"
              title="Senha"
              label="Digite sua senha"
              type="password"
              value={user.password}
              error={errors.password}
              onChange={(value) => handleChange("password", value)}
              textFieldProps={{ InputProps: { disableUnderline: true } }}
            />
          </FormControl>
          <Button
            label="Entrar"
            width="300px"
            headlight
            onClick={() => authenticate(user)}
          />

          <span className="span_login">Esqueceu sua senha?</span>
          {/* <div><GoogleAuth /></div> */}
        </ContainerModal>
      </Box>
    </>
  );
};
