const Product = require("../models/Product");
const mongoose = require("mongoose");

const cloudinary = require("../config/cloudinary");


// =====================================================
// UPLOAD IMAGE TO CLOUDINARY
// =====================================================

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(

                {
                    folder: "qkart/products",
                    resource_type: "image"
                },

                (error, result) => {

                    if (error) {

                        reject(error);

                    } else {

                        resolve(result);

                    }

                }

            );


        uploadStream.end(fileBuffer);

    });

};


// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            stock
        } = req.body;


        // Validate required fields

        if (
            !name ||
            !description ||
            price === undefined ||
            !category
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Required fields are missing"

            });

        }


        // Image is required for new product

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "Product image is required"

            });

        }


        // Upload image to Cloudinary

        const result =
            await uploadToCloudinary(
                req.file.buffer
            );


        // Create product

        const product =
            await Product.create({

                name,

                description,

                price,

                category,

                brand,

                stock,

                images: [

                    {
                        url: result.secure_url,

                        public_id:
                            result.public_id
                    }

                ]

            });


        return res.status(201).json({

            success: true,

            message:
                "Product created successfully",

            product

        });


    } catch (error) {

        console.log(
            "Create product error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

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


        // Search

        if (search) {

            query.name = {

                $regex: search,

                $options: "i"

            };

        }


        // Category filter

        if (category) {

            query.category = category;

        }


        // Sorting

        let sortOption = {};


        if (sort === "priceAsc") {

            sortOption.price = 1;

        }

        else if (sort === "priceDesc") {

            sortOption.price = -1;

        }

        else {

            sortOption.createdAt = -1;

        }


        const totalProducts =
            await Product.countDocuments(
                query
            );


        const products =
            await Product.find(query)

                .populate("category")

                .sort(sortOption)

                .skip(
                    (page - 1) * limit
                )

                .limit(limit);


        return res.status(200).json({

            success: true,

            totalProducts,

            currentPage: page,

            totalPages:
                Math.ceil(
                    totalProducts / limit
                ),

            products

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// GET PRODUCT BY ID
// =====================================================

const getProductById = async (req, res) => {

    try {

        const { id } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Product ID"

            });

        }


        const product =
            await Product.findById(id)
                .populate("category");


        if (!product) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found"

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


// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Product ID"

            });

        }


        const product =
            await Product.findById(id);


        if (!product) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found"

            });

        }


        const {

            name,

            description,

            price,

            category,

            brand,

            stock

        } = req.body;


        // Update text fields

        product.name =
            name;

        product.description =
            description;

        product.price =
            price;

        product.category =
            category;

        product.brand =
            brand;

        product.stock =
            stock;


        // ==========================================
        // IF NEW IMAGE WAS SELECTED
        // ==========================================

        if (req.file) {


            // Delete old image from Cloudinary

            if (
                product.images?.[0]?.public_id
            ) {

                await cloudinary.uploader.destroy(

                    product.images[0].public_id

                );

            }


            // Upload new image

            const result =
                await uploadToCloudinary(
                    req.file.buffer
                );


            // Save new image

            product.images = [

                {

                    url:
                        result.secure_url,

                    public_id:
                        result.public_id

                }

            ];

        }


        await product.save();


        return res.status(200).json({

            success: true,

            message:
                "Product updated successfully",

            product

        });


    } catch (error) {

        console.log(
            "Update product error:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Product ID"

            });

        }


        const product =
            await Product.findById(id);


        if (!product) {

            return res.status(404).json({

                success: false,

                message:
                    "Product not found"

            });

        }


        // Delete Cloudinary image

        if (
            product.images?.[0]?.public_id
        ) {

            await cloudinary.uploader.destroy(

                product.images[0].public_id

            );

        }


        // Delete MongoDB product

        await Product.findByIdAndDelete(id);


        return res.status(200).json({

            success: true,

            message:
                "Product deleted successfully"

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

    createProduct,

    getAllProducts,

    getProductById,

    updateProduct,

    deleteProduct

};