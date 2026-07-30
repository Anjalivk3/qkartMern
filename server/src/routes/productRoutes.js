const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");

router.post("/", authMiddleware, adminMiddleware, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware,  deleteProduct);

module.exports = router;