/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "../button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonGroup } from "../button-group";
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';


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
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    handleClosed();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Excluir Campanha"}
        </DialogTitle>
        <DialogContent 
>
          <DialogContentText>Deseja excluir essa campanha?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonGroup>
            <Button label="Não" width="90px" onClick={handleClose} />

            <Button label="Sim" headlight width="90px" onClick={handleDelete} />
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
