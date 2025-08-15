import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  getPlan,
  updatePlan,
  getCategories,
  PassingPlan,
  PassingStop,
} from "@/util/dashboard";
import { useAuth } from "@/context/AuthContext";
import PlanImages from "./components/PlanImages";
import Stops from "./components/Stops";
import { Category } from "@/types";

const TYPES = ["Full day", "Half day", "Night"];

function EditPlan() {
  const [plan, setPlan] = useState<PassingPlan>({
    title: "",
    description: "",
    images: [],
    stops: [],
    type: "",
    distance: "",
    duration: "",
    categoryId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { planId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPlanExists, setIsPlanExists] = useState<boolean>(false);
  const { token, user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token || !user) {
      navigate("/");
      return;
    }
    if (!planId) {
      navigate("/account");
      return;
    }

    (async () => {
      setIsLoading(true);
      const data = await getPlan(token, planId, setError);
      if (!data) return setIsPlanExists(false);
      setIsPlanExists(true);

      const categoriesData = await getCategories(token, setError);
      if (!categoriesData) return;

      setPlan({
        ...data,
        categoryId: data.categoryId?._id,
      });
      setCategories(categoriesData);
      setIsLoading(false);
    })();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const result = await updatePlan(token, plan, setError);
    if (!result) return;

    navigate("/account");
  };

  if (!isLoading && !isPlanExists)
    return (
      <div className="text-center mt-1">
        <p className="font-semibold text-lg">
          Plan not found or does not exist. Please go back to{" "}
          <Link to="/account">your plans</Link>.
        </p>
      </div>
    );

  if (isLoading) return <div>Loading ...</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xl font-semibold">Edit Plan:</h4>
      </div>
      <div className="w-full max-w-2xl">
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdate}>
          <label className="block font-bold mb-2">Title *</label>
          <input
            type="text"
            required
            placeholder="Enter the title of your plan"
            value={plan.title || ""}
            onChange={(e) => setPlan({ ...plan, title: e.target.value })}
            className="w-full border rounded-md p-2 mb-2"
          />

          <PlanImages
            images={plan.images || []}
            setImages={(images: string[]) => setPlan({ ...plan, images })}
          />

          <label className="block font-bold mb-2">Category *</label>
          <select
            required
            value={plan.categoryId || ""}
            onChange={(e) => setPlan({ ...plan, categoryId: e.target.value })}
            className="w-full border rounded-md p-2 mb-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                selected={category._id === plan.categoryId}
              >
                {category.name}
              </option>
            ))}
          </select>

          <label className="block font-bold mb-2">Description *</label>
          <textarea
            required
            placeholder="Write a brief description of your plan"
            rows={4}
            value={plan.description || ""}
            onChange={(e) => setPlan({ ...plan, description: e.target.value })}
            className="w-full border rounded-md p-2 mb-2"
          />

          <label className="block font-bold mb-2">Type</label>
          <select
            value={plan.type || ""}
            onChange={(e) => setPlan({ ...plan, type: e.target.value })}
            className="w-full border rounded-md p-2 mb-2"
          >
            <option value="">Select a plan type</option>
            {TYPES.map((type, index) => (
              <option key={index} value={type} selected={type === plan.type}>
                {type}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <div className="grow">
              <label className="block font-bold mb-2">Distance</label>
              <input
                placeholder="Distance in miles"
                type="number"
                value={plan.distance || ""}
                onChange={(e) => setPlan({ ...plan, distance: e.target.value })}
                className="w-full border rounded-md p-2 mb-2"
              />
            </div>
            <div className="grow">
              <label className="block font-bold mb-2">Duration</label>
              <input
                placeholder="Duration in hours"
                type="number"
                value={plan.duration || ""}
                onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
                className="w-full border rounded-md p-2 mb-2"
              />
            </div>
          </div>

          <Stops
            stops={plan.stops || []}
            setStops={(stops: PassingStop[]) => setPlan({ ...plan, stops })}
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" onClick={() => navigate("/account")}>
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Publish
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPlan;
