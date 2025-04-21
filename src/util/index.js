import axios from "axios";

// Fetch data with query parameters
const getData = async (url, params = {}) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

// Fetch all data (without params) from a given URL
const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
  }
};


// const requestBody = {
//   name: "John",
//   email: "john@gmail.com",
//   password: "1234John",
// };

const postData = async (url, requestBody = {}, config = {}) => {
  try {
    const res = await axios.post(url, requestBody, config);
    return res.data;
  } catch (error) {
    console.error("POST error in", url, error);
  }
};

export { getData, getAllData, postData };
