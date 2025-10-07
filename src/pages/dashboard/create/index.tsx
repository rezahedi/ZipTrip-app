import React from "react";
import Sidebar from "./Sidebar";
import {PlacesProvider} from "@/context/PlacesContext";
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
