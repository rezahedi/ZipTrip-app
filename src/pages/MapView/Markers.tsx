import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchPlans } from "@/util";
import { Plan } from "@/types";
import Marker from "./Marker";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { XIcon } from "lucide-react";

const Markers = ({
  bounds,
}: {
  bounds: google.maps.LatLngBounds | undefined;
}) => {
  const location = useLocation();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Plan | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      const latmin = bounds?.getSouthWest().lat() || 0;
      const lngmin = bounds?.getNorthEast().lng() || 0;
      const latmax = bounds?.getNorthEast().lat() || 0;
      const lngmax = bounds?.getSouthWest().lng() || 0;
      params.set("latmin", latmin.toString());
      params.set("lngmin", lngmin.toString());
      params.set("latmax", latmax.toString());
      params.set("lngmax", lngmax.toString());
      const paramsString = params.toString();
      console.log("paramsString", paramsString);

      try {
        const res = await fetchPlans(
          `plans/nearby/?${paramsString}`,
          token,
          setError,
        );
        const { items: plans } = res;
        setPlans(plans || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching data:", error);
      }
    })();
  }, [bounds]);

  return (
    <>
      {plans.map((plan) => (
        <Marker key={plan._id} plan={plan} onClick={setSelectedMarker} />
      ))}
      {selectedMarker && (
        <InfoWindow
          headerDisabled
          position={{
            lat: selectedMarker.startLocation[0],
            lng: selectedMarker.startLocation[1],
          }}
          onClose={() => setSelectedMarker(null)}
        >
          <button
            className="absolute top-2 right-2 text-foreground/60 cursor-pointer"
            onClick={() => setSelectedMarker(null)}
          >
            <XIcon />
          </button>
          <Link to={`/plans/${selectedMarker._id}`}>
            <div className="flex gap-1 w-xs h-32">
              <img
                className="w-24 h-full object-cover rounded-sm"
                src={selectedMarker.images[0]}
                alt={selectedMarker.title}
              />
              <div className="flex-4/5 max-h-40 px-2">
                <h5 className="text-foreground/70 font-normal text-sm">
                  {selectedMarker.categoryId.name}
                </h5>
                <h3 className="font-medium text-base/snug text-balance py-1">
                  {selectedMarker.title}
                </h3>
                <p className="text-foreground/70 font-normal text-sm">
                  {selectedMarker.stopCount} stops . {selectedMarker.distance}{" "}
                  ml . {selectedMarker.duration} hr
                </p>
              </div>
            </div>
          </Link>
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
