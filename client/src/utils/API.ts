import axios from "axios";

const DEV_MODE = "developer";

const API = axios.create({
  //need to change !
  baseURL: !DEV_MODE ? "http://localhost:3001" : "https://api.brainhouse.ge",
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
