import axios from "axios";

const DEV_MODE = "developer";

const API = axios.create({
  //need to change !
  baseURL: !DEV_MODE ? "http://localhost:3001" : "https://brainhouse.ge",
  withCredentials: true,
});

export default API;
