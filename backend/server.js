import app from "./src/app.js";
import { ENV } from "./src/config/env.config.js";
import { connectDB } from "./src/config/db.config.js";
import mongoose from "mongoose";

const serverStart = async () => {
  await connectDB();

  const server = app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.PORT}`);
  });

  process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    server.close(() => {
      process.exit(0);
    });
  });
};

serverStart();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
