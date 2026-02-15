import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { Report } from "../models/report.model.js";
import { generateFollowUpResponse } from "../services/followup.service.js";

export const askFollowUp = asyncHandler(async (req, res) => {
  const { reportId, question } = req.body;

  if (!reportId || !question) {
    throw new AppError("Report ID and question are required", 400);
  }

  const report = await Report.findById(reportId);

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  const answer = await generateFollowUpResponse(
    {
      rowCount: report.rowCount,
      columnCount: report.columnCount,
      columnStats: Object.fromEntries(report.columnStats),
    },
    report.insights,
    question,
  );

  res.json({
    success: true,
    data: {
      question,
      answer,
    },
  });
});
