const API_V1_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

const postData = async (
  endpoint: string,
  requestBody = {},
  onError: (error: string) => void,
) => {
  try {
    const res = await fetch(`${API_V1_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      const errorData = await res.json();
      onError(errorData.msg || "Failed to post data");
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    onError("POST error occurred");
    return null;
  }
};

const fetchPlans = async (
  endpoint: string,
  token: string | null = null,
  onError: (error: string) => void,
) => {
  try {
    let res = await fetch(`${API_V1_BASE_URL}/${endpoint}`, {
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
    console.error(error);
    onError("An error occurred while fetching plans");
    return null;
  }
};

export { postData, fetchPlans };
