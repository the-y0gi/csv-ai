import axios from "axios";

//api..
const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL
  baseURL: "https://csv-ai-backend.vercel.app/api",
});

export default api;
