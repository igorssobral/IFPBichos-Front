import React, { useState } from "react";
import { Button } from "../button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { ButtonGroup } from "../button-group";


type props = {
  isVisible: boolean;
  handleDelete: () => void;
  handleClosed: () => void;
};

export default function ResponsiveDialog({
  isVisible,
  handleDelete,
  handleClosed,
}: props) {
  const [open, setOpen] = useState(isVisible);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    handleClosed();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        style={{ borderRadius: "25px" }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Excluir Campanha"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Deseja excluir essa campanha?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button label="Não" width="70px" onClick={handleClose} />

            <Button label="Sim" headlight width="70px" onClick={handleDelete} />
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
