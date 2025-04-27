// //-------------------------------------------``** GET ALL PLANS **`` //-------------------------------------------

// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans`; //

// import { getData, postData } from ".";

// const getAllPlans = async () => {
//   try {
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// // getAllPlans()
// //------------------------------------------- ``** GET A SINGE PLAN BY ID **``  //-------------------------------------------

// const getSinglePlan = async (planId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/plan/${planId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching a single plan:", error);
//   }
// };

// getSinglePlan("oakland-cultural-highlights");
// //------------------------------------------- ``** GET PLANS BY USER **``  //-------------------------------------------
// const getPlansByUserId = async (userId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/user/${userId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching user's plans:", error);
//   }
// };

// getPlansByUserId("john - smith");

//  //------------------------------------------- ``** GET PLANS BY CATEGORY **``  //-------------------------------------------

// const getPlansByCategory = async (categoryId) => {
//   try {
//     const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/plans/category/${categoryId}`;
//     const res = await getData(URL);
//     console.log(res);
//   } catch (error) {
//     console.error("Error fetching data by category:", error);
//   }
// };

// // getPlansByCategory("academic-and-cultural-tour");

// --------------------------------------``** USER REGISTER **``  --------------------------------------

// const URL = "${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register";

// const requestBody = {
//   name: "John",
//   email: "john@gmail.com",
//   password: "1234John",
// };

// async function registerUser(URL, requestBody) {
//   const res = await postData(URL, requestBody);
//   console.log(res);
// }

// registerUser(URL, requestBody);

// export { getAllPlans, getPlansByCategory, getSinglePlan, getPlansByUserId, registerUser };
