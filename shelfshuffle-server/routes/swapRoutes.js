import express from "express";
import { sendSwapRequest } from "../controllers/swapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:userId", protect, sendSwapRequest);

export default router;