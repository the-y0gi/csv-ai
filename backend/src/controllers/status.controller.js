import { asyncHandler } from "../utils/asyncHandler.js";
import {
  checkServer,
  checkDatabase,
  checkMemoryUsage,
  checkUptime,
  checkCloudinary,
  checkGemini,
} from "../services/status.service.js";

export const getStatus = asyncHandler(async (req, res) => {
  const [cloudinaryStatus, geminiStatus] = await Promise.all([
    checkCloudinary(),
    checkGemini(),
  ]);

  res.json({
    success: true,
    data: {
      server: checkServer(),
      database: checkDatabase(),
      cloudinary: cloudinaryStatus,
      gemini: geminiStatus,
      memoryUsageMB: checkMemoryUsage(),
      uptimeSeconds: checkUptime(),
    },
  });
});
