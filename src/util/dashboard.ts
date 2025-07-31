export interface PassingStop {
  name: string;
  imageURL: string;
  address: string;
  description: string;
  location: [number, number];
  sequence: number;
}
export interface PassingStopWithId extends PassingStop {
  _id: string;
}

export interface PassingPlan {
  title: string;
  description: string;
  images: string[];
  type: string;
  distance: string;
  duration: string;
  categoryId: string;
  stops: PassingStop[];
}

export interface PassingPlanWithId extends PassingPlan {
  _id: string;
  stops: PassingStopWithId[];
}

const API_V1_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const getMyPlans = async (
  params: string,
  token = "",
  onError: (error: string) => void,
) => {
  return await getData(`/account/plans?${params}`, token, onError);
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
    onError(error.message || "An error occurred while removing the plan");
    return false;
  }
};

const getPlan = async (
  token: string,
  planId: string,
  onError: (error: string) => void,
) => {
  return await getData(`/account/plans/${planId}`, token, onError);
};

const updatePlan = async (
  token: string,
  plan: PassingPlanWithId,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/account/plans/${plan._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to update plan");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while updating the plan");
    return null;
  }
};

const createPlan = async (
  token: string,
  plan: PassingPlan,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/account/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to create plan");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while creating the plan");
    return null;
  }
};

const getCategories = async (
  token: string,
  onError: (error: string) => void,
) => {
  return await getData(`/account/categories`, token, onError);
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
    onError(error.message || "An error occurred while adding bookmark");
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
    onError(error.message || "An error occurred while removing bookmark");
    return false;
  }
};

const getBookmarks = async (
  params: string,
  token: string,
  onError: (error: string) => void,
) => {
  return await getData(`/account/bookmarks?${params}`, token, onError);
};

const getData = async (
  endpoint: string,
  token: string = "",
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}${endpoint}`, {
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to fetch plans");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while fetching plans");
    return null;
  }
};

export {
  getMyPlans,
  deletePlan,
  getPlan,
  updatePlan,
  getCategories,
  createPlan,
  AddBookmark,
  removeBookmark,
  getBookmarks,
};
