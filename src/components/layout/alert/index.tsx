import React, { useEffect, useState } from "react";
import {Alert, AlertTitle, Snackbar, Zoom } from "@mui/material";

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
    }, 2000);
  }, [isVisible]);

  return (
    <Zoom in={isVisibles} style={{marginTop:"70px"}} >
     
        <Snackbar open={isVisible} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert
          variant="filled"
          
          severity={severity || "success"}
          style={{ borderRadius: "10px" }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
        </Snackbar>
     
    </Zoom>
  );
};

export default AlertMessage;
