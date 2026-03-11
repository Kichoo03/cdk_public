import axios from "axios";

const API = axios.create({
  baseURL: "https://cdk-jppf.onrender.com/api/",
});

export default API;
