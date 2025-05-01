const getMyPlans = async (token, onError) => {
  try {
    let res = await fetch("/api/v1/account/plans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

const deletePlan = async (token, planId, onError) => {
  try {
    let res = await fetch(`/api/v1/account/plans/${planId}`, {
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

const getPlan = async (token, planId, onError) => {
  try {
    let res = await fetch(`/api/v1/account/plans/${planId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to fetch plan");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while fetching the plan");
    return null;
  }
};

const updatePlan = async (token, plan, onError) => {
  try {
    let res = await fetch(`/api/v1/account/plans/${plan._id}`, {
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

const createPlan = async (token, plan, onError) => {
  try {
    let res = await fetch("/api/v1/account/plans", {
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

const getCategories = async (token, onError) => {
  try {
    let res = await fetch("/api/v1/account/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to fetch categories");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while fetching categories");
    return null;
  }
};

const getBookmarkedPlan = async (token, onError) => {
  try {
    let res = await fetch(`/api/v1/account/bookmarks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to fetch plan");
      return null;
    }
    return await res.json();
  } catch (error) {
    onError(error.message || "An error occurred while fetching the plan");
    return null;
  }
};

const deleteBookmarkedPlan = async (token, planId, onError) => {
  try {
    let res = await fetch(`/api/v1/account/bookmarks/${planId}`, {
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

const addBookmarkedPlan = async (token, planId, setError) => {
  try {
    const res = await fetch(`/api/v1/account/bookmarked/${planId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to bookmark the plan.");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    setError(err.message || "Something went wrong");
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
  getBookmarkedPlan,
  deleteBookmarkedPlan,
  addBookmarkedPlan,
};
