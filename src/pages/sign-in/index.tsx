import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./styles.css";
import { Container } from "../../components/ui/container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Button } from "../../components/ui/button";
import { Title } from "../../components/ui/tittle";
import { GoogleAuth } from "../../components/layout/googlelogin";
import { Navbar } from "../../components/layout/navbar";
import { useNavigate } from "react-router-dom";
import { FormLabel } from "../../components/ui/formLabel";
import CustomTextField from "../../components/ui/customTextField";

interface user {
  email: string;
  password: string;
}

export const Login = () => {
  const [user, setUser] = useState<user>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const authenticate = (data: any) => {
    console.log(data);
  };
  const handleCancelClick = () => {
    navigate("/campanhas");
  };
  const handleChange = (field: keyof user, value: any) => {
    console.log(`Changing ${field} to ${value}`);
    setUser((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      {/* <Navbar title="" visible={false} visibleMenu={false} /> */}
      <div className="content">
        <Container>
          <Title label="Login"></Title>

          <FormControl onSubmit={handleSubmit(authenticate)}>
            <CustomTextField
              id="email"
              title="Email"
              label="Digite seu email"
              type="text"
              value={user.email}
              onChange={(value) => handleChange("email", value)}
              textFieldProps={{ InputProps: { disableUnderline: true } }}
            />
            <CustomTextField
              id="password"
              title="Senha"
              label="Digite sua senha"
              type="text"
              value={user.password}
              onChange={(value) => handleChange("password", value)}
              textFieldProps={{ InputProps: { disableUnderline: true } }}
            />
          </FormControl>
          <Button
            label="Entrar"
            width="250px"
            headlight
            onClick={handleCancelClick}
          />

          <span className="span_login">Esqueceu sua senha?</span>
          <div>{/* <GoogleAuth /> */}</div>
        </Container>
      </div>
    </>
  );
};
