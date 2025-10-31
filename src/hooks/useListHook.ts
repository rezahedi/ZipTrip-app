import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Place } from "@/types";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export type ListType = {
  _id: string;
  name: string;
  placeIDs: string[];
  placeDetails?: Place[];
};

export default function useListHook() {
  const [list, setList] = useState<ListType[] | null>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    (async () => {
      setLoading(true);
      await fetch(`${API_BASE_URL}/account/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setList(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    })();
  }, []);

  const createList = async (name: string) => {
    if (!token) {
      setList(null);
      throw new Error("You must be logged in to create a new list");
    }

    setSaving(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create the list");
      }
      const newList = await res.json();
      setList((prev) => (prev ? [...prev, newList] : [newList]));
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  const getList = async (listId: string) => {
    if (!token) {
      setList(null);
      throw new Error("You must be logged in to get list");
    }

    setSaving(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/list/${listId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to get list");
      }
      // TODO: set places here
      const listWithPlaces = await res.json();
      setList((prev) => {
        if (!prev) return null;
        return prev.map((l) => (l._id === listId ? listWithPlaces : l));
      });
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  const removeList = async (listId: string) => {
    if (!token) {
      setList(null);
      throw new Error("You must be logged in to remove list");
    }

    setSaving(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/list/${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to remove list");
      }
      setList((prev) => prev?.filter((l) => l._id !== listId) || prev);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  const addPlaceToList = async (listId: string, place: Place) => {
    if (!token) {
      setList(null);
      throw new Error("You must be logged in to add place to list");
    }

    setSaving(true);
    try {
      let res = await fetch(`${API_BASE_URL}/account/list/${listId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(place),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to add the place to list");
      }
      const updatedList = await res.json();
      setList((prev) => {
        if (!prev) return null;
        return prev.map((l) => (l._id === listId ? updatedList : l));
      });
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  const removePlaceFromList = async (listId: string, placeId: string) => {
    if (!token) {
      setList(null);
      throw new Error("You must be logged in to remove place from list");
    }

    setSaving(true);
    try {
      let res = await fetch(
        `${API_BASE_URL}/account/list/${listId}/${placeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to remove place from list");
      }
      const updatedList = await res.json();
      setList((prev) => {
        if (!prev) return null;
        return prev.map((l) => (l._id === listId ? updatedList : l));
      });
      setSaving(false);
    } catch (error) {
      setSaving(false);
      throw error;
    }
  };

  return {
    list,
    createList,
    getList,
    removeList,
    addPlaceToList,
    removePlaceFromList,
    saving,
    loading,
  };
}
