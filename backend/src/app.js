import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/health.routes.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import { responseTime } from "./middleware/responseTime.middleware.js";

import uploadRoutes from "./routes/upload.routes.js";
import reportRoutes from "./routes/report.routes.js";
import statusRoutes from "./routes/status.routes.js";
import followupRoutes from "./routes/followup.routes.js";

const app = express();

app.use(helmet());

app.use(compression());

app.use(express.json({ limit: "10kb" }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);
app.use(responseTime);

app.use("/api/health", healthRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/followup", followupRoutes);

app.use(globalErrorHandler);

export default app;
