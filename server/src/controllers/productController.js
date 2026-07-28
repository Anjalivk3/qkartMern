const Product = require("../models/Product");
const mongoose = require("mongoose");


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

const getAllProducts = async (req, res) => {

    try {

        let {
            page = 1,
            limit = 8,
            search = "",
            category = "",
            sort = ""
        } = req.query;

        page = Number(page);
        limit = Number(limit);

        const query = {};

        // Search by product name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        let sortOption = {};

        if (sort === "priceAsc") {
            sortOption.price = 1;
        } else if (sort === "priceDesc") {
            sortOption.price = -1;
        } else {
            sortOption.createdAt = -1;
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query).populate("category")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({

            success: true,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            products

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });

        }

        const product = await Product.findById(id).populate("category");

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        return res.status(200).json({

            success: true,

            product

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });

        }

        const updatedProduct = await Product.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedProduct) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        return res.status(200).json({

            success: true,

            message: "Product updated successfully",

            product: updatedProduct

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });

        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }

};


module.exports = {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
};