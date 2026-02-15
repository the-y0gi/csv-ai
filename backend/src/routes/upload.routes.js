import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadCSV } from "../controllers/upload.controller.js";
import { aiRateGuard } from "../middleware/aiRateGuard.middleware.js";
import { concurrencyGuard } from "../middleware/concurrency.middleware.js";

const router = express.Router();

router.post(
  "/",
  concurrencyGuard,
  aiRateGuard,
  upload.single("file"),
  uploadCSV,
);

export default router;
