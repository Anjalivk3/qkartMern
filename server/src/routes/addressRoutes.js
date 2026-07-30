const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addAddress, getAddresses, getAddressById, updateAddress, deleteAddress, setDefaultAddress
} = require("../controllers/addressController");

router.post("/", authMiddleware, addAddress);
router.get("/", authMiddleware, getAddresses);
router.get("/:id", authMiddleware, getAddressById);
router.put("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);
router.patch("/:id/default", authMiddleware, setDefaultAddress);


module.exports = router;