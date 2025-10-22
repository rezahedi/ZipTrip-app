import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import PlanCard from "@/Components/Common/PlanCard";
import { fetchData } from "@/util";
import WelcomeMessage from "@/Components/Common/search/WelcomeMessage";
import EmptyResultMessage from "@/Components/Common/search/EmptyResultMessage";
import Pagination from "@/Components/Common/Pagination";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { useAuth } from "@/context/AuthContext";
import { Plan } from "@/types";
import Title from "@/Components/Header/Title";

const PAGE_SIZE = 8;

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(
    getQueryValue(location.search, "q"),
  );
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
    setSearchQuery(getQueryValue(location.search, "q"));
  }, [location.search]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("search", searchQuery);
      params.set("page", page);
      params.set("size", PAGE_SIZE.toString());
      const paramsString = params.toString();

      try {
        const res = await fetchData(`plans?${paramsString}`, token, setError);
        setPlans(res?.items || []);
        setPagesCount(res?.pagesCount || 0);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, [searchQuery, page, token]);

  if (searchQuery === "") return <WelcomeMessage />;

  if (!isLoading && plans.length === 0) return <EmptyResultMessage />;

  return (
    <div className="mt-0.5 mb-1">
      <Title>{`"${searchQuery}" search result`}</Title>
      <h5 className="text-lg font-bold mt-4">
        Search result for <u>{searchQuery}</u>:
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
              <PlanCard key={plan._id} {...plan} image={plan.images[0]} />
            ))}
        </div>
        <Pagination page={Number(page)} pagesCount={pagesCount} />
      </div>
    </div>
  );
};

export default SearchPage;
