import axios from "axios";

const API = axios.create({
  baseURL: "http://ec2-3-108-64-248.ap-south-1.compute.amazonaws.com:8080/", 
  withCredentials: true, 
});

export default API;
