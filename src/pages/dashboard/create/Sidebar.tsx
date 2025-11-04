import React from "react";
import { AddNewPlace, ItineraryList } from "./itinerary";
import Editable from "./Editable";
import { useItinerary } from "@/context/ItineraryContext";
import ImageUploader from "./itinerary/ImageUploader";
import Cities from "./Cities";
import { cn } from "@/lib/utils";
import { SCROLL_BAR_STYLE } from "@/constants";
import { ListProvider } from "@/context/ListContext";
import { Button } from "@/Components/ui/button";
import { fetchData } from "@/util";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const { plan, setPolyline, setTitle, setDescription, saving, error } =
    useItinerary();
  const { token } = useAuth();

  const handleFetchDirection = async () => {
    const direction = await fetchData(
      `account/plans/${plan?._id}/direction`,
      token,
      () => {},
    );
    if (!direction || !direction.polyline) return;

    setPolyline(direction.polyline);
  };

  if (!plan) return null;

  return (
    <div
      className={cn(
        "flex-7/12 md:max-w-lg overflow-y-scroll",
        SCROLL_BAR_STYLE,
      )}
    >
      <div className="p-3">
        {saving && <div>Saving ...</div>}
        {!saving && error && <div>Error: {error}</div>}
        {plan && (
          <>
            <h2 className="font-semibold text-2xl">
              <Editable onSave={setTitle}>
                {plan.title || "Your Next Trip"}
              </Editable>
            </h2>
            <p className="text-base mt-2">
              <Editable onSave={setDescription}>
                {plan.description || "Write something about your trip..."}
              </Editable>
            </p>
            <ImageUploader />
            <div className="flex gap-2 flex-wrap my-2">
              <Cities cities={plan.cities || []} />
            </div>
            <div className="flex items-center mt-4">
              <h3 className="grow font-semibold text-xl">Itinerary</h3>
              {plan.stops && plan.stops.length > 2 && (
                <Button variant={"secondary"} onClick={handleFetchDirection}>
                  Generate Walking Direction
                </Button>
              )}
            </div>
            <ItineraryList />
          </>
        )}
      </div>
      <ListProvider>
        <AddNewPlace />
      </ListProvider>
    </div>
  );
};

export default Sidebar;
