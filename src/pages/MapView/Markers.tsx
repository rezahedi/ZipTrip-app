import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { fetchPlans } from "@/util";
import { Plan } from "@/types";
import Marker from "./Marker";

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
        <Marker key={plan._id} plan={plan} />
      ))}
    </>
  );
};

export default Markers;
