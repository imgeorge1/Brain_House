import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});
//https://brain-house.onrender.com
export default API;
