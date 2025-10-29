import IconButton from "@/Components/ui/IconButton";
import { CirclePlusIcon } from "lucide-react";
import React, { useState } from "react";
import ListEditor from "./ListEditor";

const AddToListButton = ({ placeId }: { placeId: string }) => {
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
      <ListEditor isOpen={isOpen} onClose={handleClose} placeId={placeId} />
    </>
  );
};

export default AddToListButton;
