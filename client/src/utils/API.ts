import axios from "axios";

const DEV_MODE = "developer";

const API = axios.create({
  //need to change !
  baseURL: !DEV_MODE
    ? "http://localhost:3000"
    : "https://brainhouse.onrender.com",
  withCredentials: true,
});

export default API;
