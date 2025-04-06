import express from "express";
import { addBook, getBooks } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addBook);
router.get("/", getBooks);

router.get("/books", (req, res) => {
    res.json([{ id: 1, title: "The Great Gatsby" }]);
  });

export default router;