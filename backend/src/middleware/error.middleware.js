import { ENV } from "../config/env.config.js";

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (ENV.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
