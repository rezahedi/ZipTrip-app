import React from "react";
import Sidebar from "./Sidebar";
import { PlacesProvider } from "@/context/PlacesContext";
import MapBox from "./MapBox";
import { ItineraryProvider } from "@/context/ItineraryContext";
import StartPrompt from "./StartPrompt";
import { useParams } from "react-router-dom";

const CreatePage = () => {
  const { planId } = useParams();

  return (
    <div className="h-full flex">
      <ItineraryProvider>
        {!planId && <StartPrompt />}
        {planId && (
          <>
            <Sidebar />
            <PlacesProvider>
              <MapBox />
            </PlacesProvider>
          </>
        )}
      </ItineraryProvider>
    </div>
  );
};

export default CreatePage;
