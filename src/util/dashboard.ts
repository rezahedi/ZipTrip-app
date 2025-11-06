import { fetchData } from "@/util";

const API_V1_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const getMyPlans = async (
  params: string,
  token = "",
  onError: (error: string) => void,
) => {
  return await fetchData(`account/plans?${params}`, token, onError);
};

const deletePlan = async (
  token: string,
  planId: string,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/account/plans/${planId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to remove plan");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    onError("An error occurred while removing the plan");
    return false;
  }
};

const AddBookmark = async (
  token: string,
  planId: string,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/account/bookmarks/${planId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to add bookmark");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    onError("An error occurred while adding bookmark");
    return false;
  }
};

const removeBookmark = async (
  token: string,
  planId: string,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/account/bookmarks/${planId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to remove bookmark");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    onError("An error occurred while removing bookmark");
    return false;
  }
};

const getBookmarks = async (
  params: string,
  token: string,
  onError: (error: string) => void,
) => {
  return await fetchData(`account/bookmarks?${params}`, token, onError);
};

export { getMyPlans, deletePlan, AddBookmark, removeBookmark, getBookmarks };
