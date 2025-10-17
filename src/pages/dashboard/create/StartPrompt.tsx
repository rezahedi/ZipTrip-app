import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { useItinerary } from "@/context/ItineraryContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import SelectCity from "./SelectCity";

const StartPrompt = () => {
  const { plan, createPlan, loading, error } = useItinerary();
  const { user } = useAuth();
  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const cities = JSON.parse(formData.get("cities") as string);
    await createPlan({
      title: title,
      description: description,
      cities: cities,
      stops: [],
    });
  };

  useEffect(() => {
    if (!plan) return;

    redirect(`/create/${plan._id}`);
  }, [plan]);

  return (
    <div className="flex w-full justify-center items-center">
      <form
        className="flex flex-col gap-2 w-xl shadow-xl border rounded-lg px-4 py-14 md:px-14"
        onSubmit={handleSubmit}
      >
        <h3 className="font-semibold text-2xl mb-4 text-center">
          What&apos;s your plan about?
        </h3>
        <input
          name="title"
          type="text"
          placeholder="Enter trip title (e.g. Golden Gate Getaway)"
          className="border rounded-md p-1.5 px-3"
        />
        <textarea
          name="description"
          placeholder="Enter a short trip description (e.g. Explore San Francisco's most iconic sights in one route)"
          className="border rounded-md p-1.5 px-3"
        />
        <SelectCity name="cities" />
        <Button type="submit" disabled={loading} className="mt-2">
          Start Planning
        </Button>
        {loading && <p>Creating your plan, hang tight...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default StartPrompt;
