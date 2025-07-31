import React, { useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { PassingStop } from "@/util/dashboard";

const StopDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (stop: PassingStop) => void;
}) => {
  const isMobile = window.innerWidth < 600;
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onConfirm({
      name: nameRef.current!.value || "",
      imageURL: imageRef.current!.value || "",
      address: addressRef.current!.value || "",
      location: [Number(latRef.current!.value), Number(lngRef.current!.value)],
      description: "",
      sequence: 0,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullScreen={isMobile}
    >
      <form onSubmit={handleAdd}>
        <Box style={{ padding: "10px 30px" }}>
          <DialogTitle id="alert-dialog-title">
            Type in Your Place Manually
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box sx={{ width: { sx: "100%", sm: "600px" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    padding: 2,
                  }}
                >
                  <TextField
                    inputRef={nameRef}
                    required
                    variant="outlined"
                    fullWidth
                    placeholder="Enter the name *"
                    sx={{ "& input": { background: "white" } }}
                  />
                  <TextField
                    inputRef={imageRef}
                    required
                    variant="outlined"
                    fullWidth
                    placeholder="Enter the image URL *"
                    sx={{ "& input": { background: "white" } }}
                  />
                  <TextField
                    inputRef={addressRef}
                    required
                    variant="outlined"
                    fullWidth
                    placeholder="Enter the address *"
                    sx={{ "& input": { background: "white" } }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      inputRef={latRef}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter the latitude"
                      sx={{ "& input": { background: "white" } }}
                    />
                    <TextField
                      inputRef={lngRef}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter the longitude"
                      sx={{ "& input": { background: "white" } }}
                    />
                  </Box>
                </Box>
              </Box>
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
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};

export default StopDialog;
