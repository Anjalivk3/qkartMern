const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    placeOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus
} = require("../controllers/orderController");

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.patch("/:id/cancel", authMiddleware, cancelOrder);
router.patch(
    "/:id/status",
    authMiddleware, adminMiddleware,    
    updateOrderStatus
);
// router.patch(
//     "/:id/status",
//     authMiddleware,
//     adminMiddleware,
//     updateOrderStatus
// );

module.exports = router;