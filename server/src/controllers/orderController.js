const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const address = await Address.findOne({
            user: req.user.id,
            isDefault: true
        });

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Default address not found"
            });
        }

        const orderItems = [];

        let totalAmount = 0;

      // STEP 1: Check stock for ALL products first

for (const item of cart.items) {

    if (item.product.stock < item.quantity) {

        return res.status(400).json({
            success: false,
            message: `${item.product.name} does not have enough stock`
        });

    }
}


// STEP 2: Prepare order items and calculate total

for (const item of cart.items) {

    orderItems.push({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images?.[0]?.url,
        price: item.product.price,
        quantity: item.quantity
    });

    totalAmount +=
        item.product.price * item.quantity;
    }
        const shippingAddress = {
            fullName: address.fullName,
            mobileNumber: address.mobileNumber,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country
        };

        const order = await Order.create({
            user: req.user.id,
            orderItems,
            shippingAddress,
            totalAmount
        });

        // STEP 3: Decrease stock after order is created

        for (const item of cart.items) {

            item.product.stock -= item.quantity;

            await item.product.save();
        }

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};


const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user.id
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



const getOrderById = async (req, res) => {

    try {

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


const cancelOrder = async (req, res) => {

    try {

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        if (order.orderStatus === "Delivered") {

            return res.status(400).json({
                success: false,
                message: "Delivered order cannot be cancelled"
            });

        }

        if (order.orderStatus === "Cancelled") {

            return res.status(400).json({
                success: false,
                message: "Order is already cancelled"
            });

        }

        order.orderStatus = "Cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        if (!orderStatus) {
            return res.status(400).json({
                success: false,
                message: "Order status is required"
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }


        //     if (order.orderStatus === "Cancelled") {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Cancelled order cannot be updated"
        //     });
        // }

        // if (order.orderStatus === "Delivered") {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Delivered order cannot be updated"
        //     });
        // }

        const validStatuses = [
                "Pending",
                "Processing",
                "Delivered",
                "Cancelled"
            ];

            if (!validStatuses.includes(orderStatus)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order status"
                });
            }

        const allowedTransitions = {
            Pending: ["Processing", "Cancelled"],
            Processing: ["Delivered"],
            Delivered: [],
            Cancelled: []
        };

        if (!allowedTransitions[order.orderStatus].includes(orderStatus)) {
        return res.status(400).json({
        success: false,
        message: `Cannot change status from ${order.orderStatus} to ${orderStatus}`
        });
}

        order.orderStatus = orderStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




module.exports = {
    placeOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus
};