import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getLastReports,
  getReportById,
} from "../services/report.service.js";
import { AppError } from "../utils/AppError.js";

const router = express.Router();

// Get last 5 reports
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reports = await getLastReports();

    res.json({
      success: true,
      data: reports,
    });
  })
);

// Get single report
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const report = await getReportById(req.params.id);

    if (!report) {
      throw new AppError("Report not found", 404);
    }

    res.json({
      success: true,
      data: report,
    });
  })
);

export default router;
