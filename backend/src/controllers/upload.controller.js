import { processCSVStream } from "../services/csv.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { uploadToCloudinary } from "../services/upload.service.js";
import { generateInsightsWithFailover } from "../services/gemini/gemini.manager.js";
import { saveReport } from "../services/report.service.js";

export const uploadCSV = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("CSV file is required", 400);
  }

  const startTime = Date.now();

  const uploadResult = await uploadToCloudinary(
    req.file.buffer,
    req.file.originalname,
  );

  const metadata = await processCSVStream(req.file.buffer);

  const insights = await generateInsightsWithFailover(metadata);

  const processingTime = Date.now() - startTime;

  const savedReport = await saveReport({
    filename: req.file.originalname,
    fileUrl: uploadResult.secure_url,
    rowCount: metadata.rowCount,
    columnCount: metadata.columnCount,
    columnStats: metadata.columnStats,
    insights,
    processingTimeMs: processingTime,
  });

  res.status(200).json({
    success: true,
    message: "Report generated successfully",
    data: savedReport,
  });
});
