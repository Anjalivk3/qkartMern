const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");


const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");


// router.post("/", authMiddleware, adminMiddleware,
//     upload.array("images", 5), createProduct);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    createProduct
);
 

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, adminMiddleware,
  upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware,  deleteProduct);

module.exports = router;