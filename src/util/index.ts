import axios from "axios";

const API_V1_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

// Fetch data with query parameters
const getData = async (url: string, params = {}) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
    throw error;
  }
};

// Fetch all data (without params) from a given URL
const getAllData = async (url: string) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
    throw error;
  }
};

// const requestBody = {
//   name: "John",
//   email: "john@gmail.com",
//   password: "1234John",
// };

const postData = async (url: string, requestBody = {}, config = {}) => {
  try {
    const res = await axios.post(url, requestBody, config);
    return res.data;
  } catch (error) {
    console.error("POST error in", url, error);
    throw error;
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

export { getData, getAllData, postData, fetchPlans };
