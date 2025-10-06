import React from "react";
import {PlansProvider} from "@/pages/MapView/PlansContext";
import Map from "@/pages/MapView/Map";

const CreatePage = () => {
  return (
    <PlansProvider>
      <div className="h-full flex">
        <div className="w-lg">Block-based plan creator in sidebar</div>
        <Map />
      </div>
    </PlansProvider>
  );
};

export default CreatePage;
