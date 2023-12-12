import React from "react";
import "./styles.css";
import { Container } from "../../components/ui/container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Login = () => {
  return (
    <div className="content">
      <Container>
        <h1>Login</h1>

        <form action="" className="login_content">
          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            label="Digite seu email"
            variant="outlined"
            size="small"
            type={"email"}
           
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
            style={{
              width: "250px",
              height: "40px",
              borderRadius: 20,
              backgroundColor: "#24CA68",
              marginTop: "30px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            Entrar
          </Button>
          <span className="span_login">Esqueceu sua senha?</span>
      </Container>
    </div>
  );
};
