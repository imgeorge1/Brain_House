import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001", // https://brain-house.onrender.com
  withCredentials: true,
});

// API.interceptors.request.use((config) => {
//   const token = document.cookie.split('=')[1];
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
export default API;
