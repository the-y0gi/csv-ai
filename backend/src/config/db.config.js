import mongoose from "mongoose";
import { ENV } from "./env.config.js";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    throw error; 
  }
};