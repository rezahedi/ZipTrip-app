import React from "react";
import Sidebar from "./Sidebar";
import {PlacesProvider} from "@/context/PlacesContext";
import MapBox from "./MapBox";
import {ItineraryProvider} from "@/context/ItineraryContext";
import StartPrompt from "./StartPrompt";

const CreatePage = () => {
  return (
    <div className="h-full flex">
      <ItineraryProvider>
        <StartPrompt />
        <Sidebar />
        <PlacesProvider>
          <MapBox />
        </PlacesProvider>
      </ItineraryProvider>
    </div>
  );
};

export default CreatePage;
