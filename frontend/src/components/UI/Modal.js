import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from '@mui/material/DialogActions';
import Button from "./LobbyButton";

const Modal = ({ buttonTitle, children, width, height, backgroundColor }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: width,
            height: height,
            margin: "auto",
            maxHeight: "none",
            maxWidth: "none",
            backgroundColor: backgroundColor || "rgba(200, 200, 200, 0.9)",
            overflow: "hidden",
          },
        }}
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
