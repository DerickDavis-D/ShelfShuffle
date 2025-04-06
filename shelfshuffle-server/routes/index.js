import express from "express";
import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import swapRoutes from "./swapRoutes.js";
import chatRoutes from "./chatRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/swaps", swapRoutes);
router.use("/chat", chatRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;