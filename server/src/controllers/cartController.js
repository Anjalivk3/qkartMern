const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {

    try {

        const { productId, quantity = 1 } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: req.user.id
        });

        // Create cart if it doesn't exist
        if (!cart) {

            cart = await Cart.create({

                user: req.user.id,

                items: []

            });

        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(item =>
            item.product.toString() === productId
        );

        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            cart.items.push({

                product: productId,

                quantity

            });

        }

        await cart.save();

        return res.status(200).json({

            success: true,

            message: "Product added to cart",

            cart

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getCart = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        })
        .populate({
            path: "items.product",
            populate: {
                path: "category"
            }
        });

        if (!cart) {

            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    total: 0
                }
            });

        }

        let total = 0;

        cart.items.forEach(item => {

            total += item.product.price * item.quantity;

        });

        return res.status(200).json({

            success: true,

            cart,

            total

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


const updateCartQuantity = async (req,res)=>{

    try{

        const { productId, quantity } = req.body;

        if(quantity < 1){

            return res.status(400).json({

                success:false,

                message:"Quantity must be at least 1"

            });

        }

        const cart = await Cart.findOne({

            user:req.user.id

        });

        if(!cart){

            return res.status(404).json({

                success:false,

                message:"Cart not found"

            });

        }

        const item = cart.items.find(

            item=>item.product.toString()===productId

        );

        if(!item){

            return res.status(404).json({

                success:false,

                message:"Product not found in cart"

            });

        }

        item.quantity = quantity;

        await cart.save();

        return res.status(200).json({

            success:true,

            message:"Quantity updated",

            cart

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

const removeFromCart = async (req,res)=>{

    try{

        const { productId } = req.params;

        const cart = await Cart.findOne({

            user:req.user.id

        });

        if(!cart){

            return res.status(404).json({

                success:false,

                message:"Cart not found"

            });

        }




            const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed successfully",
            cart
        });

    }

    catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


module.exports = { addToCart, getCart, updateCartQuantity, removeFromCart  }