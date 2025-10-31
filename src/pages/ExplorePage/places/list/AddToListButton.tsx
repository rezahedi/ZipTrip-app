import IconButton from "@/Components/ui/IconButton";
import { CirclePlusIcon } from "lucide-react";
import React from "react";
import { useList } from "@/context/ListContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

const AddToListButton = ({ placeId }: { placeId: string }) => {
  const { openEditor } = useList();
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleOpenEditor = () => {
    if (!token) return openLogin();
    openEditor(placeId);
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
