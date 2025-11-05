import { useAuth } from "@/context/AuthContext";
import { PlanType } from "@/context/PlanTypes";
import { Plan, PlanDTO } from "@/types";
import { useState } from "react";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export default function usePlanApi() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const createPlan = async (plan: PlanDTO) => {
    if (!token) {
      setPlan(null);
      throw new Error("You must be logged in to create a plan");
    }

    setLoading(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(plan),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create plan");
      }
      setPlan(await res.json());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const getPlan = async (planId: string) => {
    if (!token) {
      setPlan(null);
      throw new Error("You must be logged in to edit a plan");
    }

    setLoading(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/plans/${planId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to get plan");
      }
      setPlan(await res.json());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updatePlan = async (planId: string, planData: PlanType) => {
    if (!token) {
      setPlan(null);
      throw new Error("You must be logged in to edit a plan");
    }

    setSaving(true);
    try {
      let res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/account/plans/${planId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(planData),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create plan");
      }
      setPlan(await res.json());
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  return { plan, setPlan, saving, loading, createPlan, getPlan, updatePlan };
}
