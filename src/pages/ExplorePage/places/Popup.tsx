import React, { useEffect, useState } from "react";
import { Place } from "@/types";
import { fetchData } from "@/util";
import PopupSkeleton from "./PopupSkeleton";
import { usePlans } from "../PlansContext";

const Popup = () => {
  const { selection } = usePlans();
  const [detailLoading, setDetailLoading] = useState<boolean>(true);
  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string>("");
  // const place = selection?.item as Place | undefined;

  useEffect(() => {
    if (!selection) return;

    (async () => {
      setDetailLoading(true);

      // If name had value, mean the place is already exist in db
      // if not fetch place's detail from G-Places API
      const URL = `places/${selection.placeId}`;
      const res = await fetchData(URL, null, () => {});
      if (!res) {
        setError("Couldn't find it, Try again or try other places!");
        return setDetailLoading(false);
      }

      setPlace(res);
      setDetailLoading(false);
    })();
  }, [selection]);

  if (!selection) return null;

  if (detailLoading) return <PopupSkeleton />;

  if (error) return <div className="flex pt-6 p-3 text-center">{error}</div>;

  return (
    <div className="flex gap-1 sm:w-xs sm:h-32">
      <img
        className="w-24 h-full object-cover rounded-sm hidden sm:block"
        src={place?.imageURL}
        alt={place?.name}
      />
      <div className="flex-4/5 max-h-40 px-2">
        <h3 className="font-medium text-base/snug text-balance py-1">
          {place?.name}
        </h3>
        <p>{place?.address}</p>
      </div>
    </div>
  );
};

export default Popup;
