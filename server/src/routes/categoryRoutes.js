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
const adminMiddleware = require("../middleware/adminMiddleware");


// Public Routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Protected Routes (temporarily)
router.post("/", authMiddleware, adminMiddleware, createCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;