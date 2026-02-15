import multer from "multer";
import { AppError } from "../utils/AppError.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "text/csv" &&
      !file.originalname.endsWith(".csv")
    ) {
      cb(new AppError("Only CSV files are allowed", 400));
    }
    cb(null, true);
  },
});
