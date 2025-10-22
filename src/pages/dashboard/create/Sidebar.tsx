import React from "react";
import { ItineraryList } from "./itinerary";
import Editable from "./Editable";
import { useItinerary } from "@/context/ItineraryContext";
import ImageUploader from "./itinerary/ImageUploader";
import Cities from "./Cities";

const Sidebar = () => {
  const { plan, setTitle, setDescription, saving, error } = useItinerary();

  if (!plan) return null;

  return (
    <div className="w-lg p-3 h-[calc(100vh-61px)] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {saving && <div>Saving ...</div>}
      {!saving && error && <div>Error: {error}</div>}
      {plan && (
        <>
          <h2 className="font-semibold text-2xl">
            <Editable onSave={setTitle}>
              {plan?.title || "Your Next Trip"}
            </Editable>
          </h2>
          <p className="text-base mt-2">
            <Editable onSave={setDescription}>
              {plan?.description || "Write something about your trip..."}
            </Editable>
          </p>
          <ImageUploader />
          <div className="flex gap-2 flex-wrap my-2">
            <Cities cities={plan.cities || []} />
          </div>
          <h3 className="font-semibold text-xl mt-4">Itinerary</h3>
          <ItineraryList />
        </>
      )}
    </div>
  );
};

export default Sidebar;
