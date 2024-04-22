import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

function setLocalStorageContent() {
  localStorage.clear();
  window.location.reload();
}

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button {...bindTrigger(popupState)}>
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </Button>
          <Menu
            sx={{ position: "absolute", marginRight: "50px" }}
            {...bindMenu(popupState)}
          >
            <MenuItem
              onClick={() => {
                popupState.close();
                setLocalStorageContent();
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
