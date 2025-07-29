import React from "react";
import {
  AlertDialog as AlertD,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
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
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}) => {
  if (!isOpen) return null;
  return (
    <AlertD open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="px-3 py-8">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} autoFocus>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertD>
  );
};

export default AlertDialog;
