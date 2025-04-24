// TODO: The token value should be saved in localStorage in Register or Login components
const token =
  localStorage.getItem("token")

const getMyPlans = async (onError) => {
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

export { getMyPlans };
