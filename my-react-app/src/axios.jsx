import axios from "axios";

const API = axios.create({
  baseURL: "https://linkhub-back-ak.onrender.com/", 
  withCredentials: true, 
});

export default API;
