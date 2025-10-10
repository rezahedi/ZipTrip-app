import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import PlanCard from "@/Components/Common/PlanCard";
import { fetchData } from "@/util";
import Pagination from "@/Components/Common/Pagination";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { useAuth } from "@/context/AuthContext";
import { Plan, User } from "@/types";

const PAGE_SIZE = 8;

const UserPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
  }, [location.search]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      params.set("size", PAGE_SIZE.toString());
      const paramsString = params.toString();

      try {
        const res = await fetchData(
          `plans/user/${userId}?${paramsString}`,
          token,
          setError,
        );
        const { plans: userPlans, ...userDetails } = res;
        console.log(userPlans, userDetails);
        setPlans(userPlans.items || []);
        setUser(userDetails || {});
        setPagesCount(userPlans.pagesCount || 0);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching data:", error);
      }
    })();
  }, [page, userId]);

  if (!isLoading && user === null) return <>User not found.</>;

  if (!isLoading && plans.length === 0) return <>There is no plans.</>;

  return (
    <div className="mt-0.5 mb-1">
      <h5 className="text-lg font-bold flex items-center">
        {user && user.name && (
          <>
            <img
              alt={user.name}
              src={user.imageURL}
              className="rounded-full size-10 mr-2"
            />
            {user.name}
          </>
        )}
      </h5>
      <div className="flex flex-wrap justify-between gap-4">
        {!isLoading && error && <p>{error}</p>}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <PlanCardSkeleton key={index} />
            ))}
          {!isLoading &&
            plans.map((plan) => (
              <PlanCard {...plan} image={plan.images[0]} key={plan._id} />
            ))}
        </div>
        <Pagination page={Number(page)} pagesCount={pagesCount} />
      </div>
    </div>
  );
};

export default UserPage;
