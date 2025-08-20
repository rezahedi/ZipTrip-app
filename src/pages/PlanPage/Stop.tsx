import React from "react";
import { Stop as StopType } from "@/types";

const Stop = ({ detail }: { detail: StopType }) => {
  const { name, imageURL, address } = detail;
  return (
    <div className="group transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg rounded-lg flex items-start sm:items-center gap-0.5 flex-col sm:flex-row overflow-hidden bg-foreground/3">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="w-full sm:w-56 object-cover group-hover:scale-105 transition-all duration-200"
        />
      )}
      <div className="flex flex-col content-start p-4 gap-2">
        <h5 className="font-semibold text-lg">{name}</h5>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default Stop;
