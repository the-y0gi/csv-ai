import express from "express";
import { askFollowUp } from "../controllers/followup.controller.js";
import { aiRateGuard } from "../middleware/aiRateGuard.middleware.js";

const router = express.Router();

router.post("/", aiRateGuard, askFollowUp);

export default router;
