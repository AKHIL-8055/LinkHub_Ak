import axios from "axios";

const API = axios.create({
  baseURL: "/api/", // Use relative path to allow Vercel to rewrite requests
});

export default API;
