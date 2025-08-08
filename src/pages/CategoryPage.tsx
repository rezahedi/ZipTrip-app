import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import PlanCard from "@/Components/Common/PlanCard";
import { fetchPlans } from "@/util";
import Pagination from "@/Components/Common/Pagination";
import PlanCardSkeleton from "@/Components/Common/PlanCardSkeleton";
import { useAuth } from "@/context/AuthContext";
import { Plan, Category } from "@/types";

const PAGE_SIZE = 8;

const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  let page = getQueryValue(location.search, "page") || "1";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [category, setCategory] = useState<Category | null>(null);
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
        const res = await fetchPlans(
          `plans/category/${categoryId}?${paramsString}`,
          token,
          setError,
        );
        const { plans: categoryPlans, ...categoryDetails } = res;
        setPlans(categoryPlans.items || []);
        setCategory(categoryDetails || null);
        setPagesCount(categoryPlans.pagesCount || 0);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching data:", error);
      }
    })();
  }, [page]);

  if (!isLoading && category === null) return <>Category not found.</>;

  if (!isLoading && plans.length === 0) return <>There is no plans.</>;

  return (
    <div className="mt-0.5 mb-1">
      {category && (
        <>
          <h5 className="text-xl font-bold">
            {category.name}
          </h5>
          <p className="mb-2">
            {category.description}
          </p>
        </>
      )}
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

export default CategoryPage;
