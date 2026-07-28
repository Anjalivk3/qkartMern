const Category = require("../models/Category");
const mongoose = require("mongoose");

const createCategory = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        const existingCategory = await Category.findOne({
            name: name.trim()
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name: name.trim(),
            description
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



const getAllCategories = async (req, res) => {

    try {

        const categories = await Category.find().sort({ name: 1 });

        return res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



const getCategoryById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Category ID"
            });

        }

        const category = await Category.findById(id);

        if (!category) {

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        }

        return res.status(200).json({
            success: true,
            category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



const updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Category ID"
            });

        }

        const updatedCategory = await Category.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedCategory) {

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        }

        return res.status(200).json({

            success: true,

            message: "Category updated",

            category: updatedCategory

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Category ID"
            });

        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {

            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        }

        return res.status(200).json({

            success: true,

            message: "Category deleted"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



module.exports = {
    createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory
};