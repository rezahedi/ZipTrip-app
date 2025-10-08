import React from "react";
import {ItineraryList} from "./itinerary";
import Editable from "./Editable";
import {useItinerary} from "@/context/ItineraryContext";

const Sidebar = () => {
  const {title, description, setTitle, setDescription} = useItinerary();

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };
  const handleDescChange = (text: string) => {
    setDescription(text);
  };

  return (
    <div className="w-lg p-3 h-[calc(100vh-61px)] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <h2 className="font-semibold text-2xl">
        {title}
        <Editable onSave={handleTitleChange}>{title}</Editable>
      </h2>
      <p className="text-base mt-2">
        <Editable onSave={handleDescChange}>{description}</Editable>
      </p>
      <h3 className="font-semibold text-xl mt-4">Itinerary</h3>
      <ItineraryList />
    </div>
  );
};

export default Sidebar;
