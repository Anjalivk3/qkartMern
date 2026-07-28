const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addToCart
} = require("../controllers/cartController");

router.post("/", authMiddleware, addToCart);

module.exports = router;