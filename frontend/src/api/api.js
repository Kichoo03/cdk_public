import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://65.0.5.180:8000/api";

const API = axios.create({
  baseURL: `${API_URL}/`,
});

export { API_URL };
export default API;
