import axios from "axios";

const api = axios.create({
  baseURL: process.env.Frontent_Url ||"http://localhost:5000/api",
});

export default api;
