import IconButton from "@/Components/ui/IconButton";
import { CirclePlusIcon } from "lucide-react";
import React, { useState } from "react";
import ListModal from "./ListModal";

const AddToListButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton title="Add to List" onClick={handleOpen}>
        <CirclePlusIcon />
      </IconButton>
      <ListModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default AddToListButton;
