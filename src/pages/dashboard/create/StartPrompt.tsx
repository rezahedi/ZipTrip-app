import React, {useState} from "react";
import {Button} from "@/Components/ui/button";
import Modal from "@/Components/Common/Modal";
import {useItinerary} from "@/context/ItineraryContext";

const StartPrompt = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const {title, description, setTitle, setDescription} = useItinerary();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    setTitle(formData.get("title") as string);
    setDescription(formData.get("description") as string);

    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Plan">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="What's your plan?"
          className=""
        />
        <textarea name="description" placeholder="Describe your plan" />
        <Button type="submit">Create Plan</Button>
      </form>
    </Modal>
  );
};

export default StartPrompt;
