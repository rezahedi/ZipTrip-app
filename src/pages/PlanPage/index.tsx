import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "@/util";
import PlanDetails from "./PlanDetails";
import { useAuth } from "@/context/AuthContext";
import { PlanWithStops } from "@/types";
import CardSection from "@/Components/Common/CardSection";

const PlanPage = () => {
  const [plan, setPlan] = useState<PlanWithStops | null>(null);
  const { planId } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSinglePlan = async (planId: string) => {
      try {
        const res = await fetchData(`plans/${planId}`, token, () => {});
        setPlan(res);
      } catch (error) {
        console.error("Error fetching a single plan:", error);
      }
    };

    if (planId) {
      fetchSinglePlan(planId);
    }
  }, [planId, token]);

  return (
    <div className="py-1">
      {plan ? <PlanDetails plan={plan} /> : <h6>Loading...</h6>}
      {plan && plan.cities.length > 0 && (
        <CardSection
          title={`More plans around ${plan.cities[0].name}`}
          cityId={plan?.cities[0].placeId}
        />
      )}
    </div>
  );
};

export default PlanPage;
