import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config.js";
import { generateInsightsWithFailover } from "./gemini/gemini.manager.js";

export const checkServer = () => {
  return "OK";
};

export const checkDatabase = () => {
  return mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
};

export const checkMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  return Math.round(memoryUsage.heapUsed / 1024 / 1024); // MB
};

export const checkUptime = () => {
  return Math.round(process.uptime());
};

export const checkCloudinary = async () => {
  try {
    await cloudinary.api.ping();
    return "Connected";
  } catch {
    return "Disconnected";
  }
};

export const checkGemini = async () => {
  try {
    const testMetadata = {
      rowCount: 1,
      columnCount: 1,
      columnStats: {
        test: { type: "number", min: 1, max: 1, avg: 1, missing: 0 },
      },
    };

    const result = await generateInsightsWithFailover(testMetadata);

    if (result.includes("temporarily unavailable")) {
      return "Unavailable";
    }

    return "Working";
  } catch {
    return "Unavailable";
  }
};
