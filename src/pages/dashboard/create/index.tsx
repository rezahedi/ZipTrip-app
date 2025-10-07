import React from "react";
import Map from "@/pages/MapView/Map";
import Sidebar from "./Sidebar";
import {PlacesProvider} from "@/context/PlacesContext";
import Markers from "@/pages/MapView/Markers";
import {ControlPosition, MapControl} from "@vis.gl/react-google-maps";
import LocateMeButton from "@/pages/MapView/LocateMeButton";
import PlacePopup from "./PlacePopup";
import MapBox from "./MapBox";

const CreatePage = () => {
  return (
    <div className="h-full flex">
      <Sidebar />
      <PlacesProvider>
        <MapBox />
      </PlacesProvider>
    </div>
  );
};

export default CreatePage;
