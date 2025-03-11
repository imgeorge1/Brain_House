import axios from "axios";

const DEV_MODE = "developer";

const API = axios.create({
  //need to change !
  baseURL: DEV_MODE
    ? "http://localhost:3001"
    : "https://brain-house-api.onrender.com",
  withCredentials: true,
});
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");

  if (!token) {
    // Refresh token logic
    try {
      const { data } = await axios.post(
        "https://yourbackend.com/auth/refresh",
        {},
        { withCredentials: true }
      );
      token = data.accessToken;
      localStorage.setItem("accessToken", token);
    } catch (err) {
      console.error("Session expired, please log in again.");
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default API;
