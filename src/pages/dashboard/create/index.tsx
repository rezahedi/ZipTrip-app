import React from "react";
import Sidebar from "./Sidebar";
import {PlacesProvider} from "@/context/PlacesContext";
import MapBox from "./MapBox";
import {ItineraryProvider} from "@/context/ItineraryContext";

const CreatePage = () => {
  return (
    <div className="h-full flex">
      <ItineraryProvider>
        <Sidebar />
        <PlacesProvider>
          <MapBox />
        </PlacesProvider>
      </ItineraryProvider>
    </div>
  );
};

export default CreatePage;
