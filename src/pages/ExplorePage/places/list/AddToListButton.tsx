import IconButton from "@/Components/ui/IconButton";
import { CirclePlusIcon } from "lucide-react";
import React from "react";
import { useList } from "@/context/ListContext";

const AddToListButton = () => {
  const { openEditor } = useList();

  return (
    <>
      <IconButton title="Add to List" onClick={openEditor}>
        <CirclePlusIcon />
      </IconButton>
    </>
  );
};

export default AddToListButton;
