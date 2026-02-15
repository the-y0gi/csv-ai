import axios from "axios";

//api
const api = axios.create({
  baseURL: process.env.Frontent_Url,
});

export default api;
