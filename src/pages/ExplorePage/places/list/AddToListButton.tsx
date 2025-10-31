import IconButton from "@/Components/ui/IconButton";
import { CirclePlusIcon } from "lucide-react";
import React from "react";
import { useList } from "@/context/ListContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { Place } from "@/types";

const AddToListButton = ({ place }: { place: Place }) => {
  const { openEditor } = useList();
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleOpenEditor = () => {
    if (!token) return openLogin();
    openEditor(place);
  };

  return (
    <>
      <IconButton title="Add to List" onClick={handleOpenEditor}>
        <CirclePlusIcon />
      </IconButton>
    </>
  );
};

export default AddToListButton;
