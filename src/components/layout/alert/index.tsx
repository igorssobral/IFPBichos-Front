import React, { useEffect, useState } from "react";
import { Fade, Stack, Alert, AlertTitle } from "@mui/material";

type props = {
  title: string;
  message: string;
  isVisible: boolean;
  severity?: "info" | "warning" | "error";
  setVisible: () => void;
};

const AlertMessage = ({
  isVisible,
  message,
  title,
  severity,
  setVisible,
}: props) => {
  const [isVisibles, setIsVisibles] = useState(isVisible);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibles(!isVisibles);
      setVisible();
    }, 1500);
  }, [isVisible]);

  return (
    <Fade in={isVisibles} timeout={1500}>
      <Stack
        sx={{ width: "fit-content", position: "absolute", right: "10px" }}
        spacing={2}
      >
        <Alert
          variant="filled"
          severity={severity || "success"}
          style={{ borderRadius: "15px" }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Stack>
    </Fade>
  );
};

export default AlertMessage;
