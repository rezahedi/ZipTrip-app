import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import {
  getCategories,
  createPlan,
  PassingPlan,
  PassingStop,
} from "@/util/dashboard";
import { useAuth } from "@/context/AuthContext";
import PlanImages from "./components/PlanImages";
import Stops from "./components/Stops";
import { Category } from "@/types";

const TYPES = ["Full day", "Half day", "Night"];

function CreateNew() {
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token, user } = useAuth();

  // TODO: Switch image URLs with actual multiple image upload feature.

  useEffect(() => {
    // FIXME: Instead of just redirecting user to home, show a not authorized message with login button or redirect to login page
    if (!token || !user) {
      navigate("/");
      return;
    }

    (async () => {
      const categoriesData = await getCategories(token, setError);

      if (!categoriesData) return;

      setCategories(categoriesData);
    })();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    // A random number with one decimal greater than 0 and less than 5
    const rate = Math.round(Math.random() * 49 + 1) / 10;
    // A random number between 0 and 100
    const reviewCount = Math.floor(Math.random() * 100);
    // Adding fake review data to the plan
    const extendedPlan = {
      ...plan,
      rate,
      reviewCount,
    };
    const result = await createPlan(token, extendedPlan, setError);
    if (!result) return;

    navigate("/account");
  };

  return (
    <>
      <div className="mb-2">
        <h4>Create a New Plan:</h4>
      </div>
      <div className="w-full max-w-2xl">
        {error && <p>{error}</p>}
        <form onSubmit={handleCreate}>
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
              <option key={category._id} value={category._id}>
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
              <option key={index} value={type}>
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

export default CreateNew;
