import axios from "axios";

const DEV_MODE = false; //need to change !

console.log(
  DEV_MODE ? "http://localhost:3000" : "https://brainhouse.onrender.com"
);

const API = axios.create({
  baseURL: DEV_MODE
    ? "http://localhost:3000"
    : "https://brainhouse.onrender.com",
  withCredentials: true,
});

export default API;
