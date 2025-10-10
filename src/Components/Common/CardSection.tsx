import React, { useState, useEffect } from "react";
import PlanCard from "./PlanCard";
import { useAuth } from "@/context/AuthContext";
import PlanCardSkeleton from "./PlanCardSkeleton";
import { fetchData } from "@/util";
import { Plan } from "@/types";

const CardSection = ({
  title,
  category = "",
  search = "",
  size = 4,
}: {
  title: string;
  category?: string;
  search?: string;
  size?: number;
}) => {
  const { token } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const result = await fetchData(
          `plans?categoryId=${category}&search=${search}&size=${size}`,
          token,
          setError,
        );
        setPlans(result?.items || []);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchAllPlans();
  }, [token]);

  return (
    <div className="mt-2 mb-4">
      <h3 className="mb-4 font-semibold text-2xl">{title}</h3>
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!loading && error && <p>{error}</p>}
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <PlanCardSkeleton key={index} />
            ))}
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              {...plan}
              image={plan.images[0]}
              isBookmarked={plan.isBookmarked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSection;
