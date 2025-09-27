import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchPlans } from "@/util";
import { Plan } from "@/types";
import Marker from "./Marker";
import { InfoWindow } from "@vis.gl/react-google-maps";

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
          position={{
            lat: selectedMarker.startLocation[0],
            lng: selectedMarker.startLocation[1],
          }}
          onClose={() => setSelectedMarker(null)}
          maxWidth={260}
        >
          <div className="max-w-3xs flex gap-1">
            <img
              className="flex-1/5"
              src={selectedMarker.images[0]}
              alt={selectedMarker.title}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <div className="flex-4/5 max-h-40">
              <h3 className="font-semibold text-md">{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default Markers;
