import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { useItinerary } from "@/context/ItineraryContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

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

    await createPlan({
      title: title,
      description: description,
      stops: [],
    });
  };

  useEffect(() => {
    if (!plan) return;

    redirect(`/create/${plan._id}`);
  }, [plan]);

  return (
    <div className="flex w-full justify-center items-center">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="What's your plan?"
          className=""
        />
        <textarea name="description" placeholder="Describe your plan" />
        <Button type="submit" disabled={loading}>
          Create Plan
        </Button>
        {loading && <p>Creating your plan, hang tight...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default StartPrompt;
