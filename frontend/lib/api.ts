import axios from "axios";

const api = axios.create({
  baseURL: process.env.Frontent_Url,
});

export default api;
