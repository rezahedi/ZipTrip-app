import React from "react";
import ItineraryList from "./ItineraryList";

const Sidebar = () => {
  const editMode = false;
  return (
    <div className="w-lg p-3">
      <h2 className="font-semibold text-2xl" contentEditable={editMode}>
        Your Plan
      </h2>
      <p className="text-base mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
        tempora deleniti asperiores atque rerum quibusdam beatae, laudantium
        corporis voluptatem, consequatur harum sed nemo ab. Blanditiis at
        doloremque iusto alias nisi.
      </p>
      <h3 className="font-semibold text-xl mt-4">Itinerary</h3>
      <ItineraryList />
    </div>
  );
};

export default Sidebar;
