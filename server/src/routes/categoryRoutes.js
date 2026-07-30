const express = require("express");

const router = express.Router();

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const authMiddleware = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected Routes (temporarily)
router.post("/", authMiddleware, createCategory);

router.put("/:id", authMiddleware, updateCategory);

router.delete("/:id", authMiddleware, deleteCategory);

module.exports = router;