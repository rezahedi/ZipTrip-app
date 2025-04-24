import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box style={{ padding: "10px 30px" }}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid darkgray",
            }}
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default AlertDialog;
