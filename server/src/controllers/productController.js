const Product = require("../models/Product");

const createProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            images,
            stock
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            images,
            stock
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createProduct
};