import React, { useState } from "react";
import "./styles.css";
import { Container } from "../../components/ui/container";
import TextField from "@mui/material/TextField";
import { Button } from "../../components/ui/button";
import { Title } from "../../components/ui/tittle";
import { GoogleAuth } from "../../components/layout/googlelogin";

interface user {
  email: string;
  password: string;
}

export const Login = () => {

  const [formUser, setFormUser] = useState<user>();

  

  return (
    <div className="content">
      <Container>
        <Title label="Login"></Title>

        <form action="" className="login_content">
          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            label="Digite seu email"
            variant="outlined"
            size="small"
            type={"email"}
            value={formUser?.email}
            
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
          <label htmlFor="password">Senha</label>
          <TextField
            id="password"
            label="Digite sua senha"
            hiddenLabel={true}
            variant="outlined"
            size="small"
            type={"password"}
            value={formUser?.password}
            InputProps={{
              style: {
                width: "250px",
                height: "40px",
                borderRadius: "15px",
              },
            }}
          />
        </form>
        <Button
          label="Entrar"
          width="250px"
          headlight
          onClick={() => {
            alert("aasasa");
          }}
        />

        <span className="span_login">Esqueceu sua senha?</span>
        <div>
          {/* <GoogleAuth /> */}
        </div>
        
      </Container>
      
    </div>
  );
};
