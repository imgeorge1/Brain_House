import axios from "axios";

const DEV_MODE = false; //need to change !

const API = axios.create({
  baseURL: DEV_MODE
    ? "http://localhost:3000"
    : "https://brain-house.onrender.com",
  withCredentials: true,
});

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default API;
