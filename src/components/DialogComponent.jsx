import React, { useState } from "react";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Delete } from "@mui/icons-material";
import { Alert } from "@mui/material";
import AskFatwasComponent from "../pages/user/Accounts/askFatwas";
import "../pages/user/Accounts/askFatwas/askfatwas.styles.scss";
const BootstrapDialog = styled(Dialog)(({ theme, size }) => ({
  "& .MuiDialog-paper": {
    width: "80% !important",
    height: "100%",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DialogComponent = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleClickOpen}>{props.children}</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle>
          <Typography variant="subtitle1" className="fw-bold">
            {props.title}
          </Typography>
          {/* <Alert>{props.title}</Alert> */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{props.msg}</Typography>
          <Typography gutterBottom></Typography>
          {props.mainComponent}
        </DialogContent>
        {!props.noBottom ? (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {props.notNowWord}
            </Button>
            {/* <Button
            variant="contained"
            color="error"
            autoFocus
            onClick={() => {
              props.action();
              handleClose();
            }}
          >
            {props.deleteWord}
          </Button> */}
          </DialogActions>
        ) : null}
      </BootstrapDialog>
    </div>
  );
};

export default DialogComponent;
