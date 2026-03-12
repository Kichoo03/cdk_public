import axios from "axios";

const API = axios.create({
  baseURL: "http://65.0.5.180:8000/api/",
});

export default API;
