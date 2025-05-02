import axios from "axios";

const DEV_MODE = false; //need to change !

const API = axios.create({
  baseURL: DEV_MODE
    ? "http://localhost:3000"
    : "https://brain-house.onrender.com",
  withCredentials: true,
});
//https://brain-house.onrender.com
export default API;
