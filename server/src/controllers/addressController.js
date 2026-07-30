const Address = require("../models/Address");
const mongoose = require("mongoose"); 


const addAddress = async (req, res) => {

    try {

        const {
            fullName,
            mobileNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            isDefault
        } = req.body;

        // If new address is default,
        // remove default from previous addresses
        if (isDefault) {

            await Address.updateMany(

                {
                    user: req.user.id
                },

                {
                    isDefault: false
                }

            );

        }

        const address = await Address.create({

            user: req.user.id,

            fullName,

            mobileNumber,

            addressLine1,

            addressLine2,

            city,

            state,

            postalCode,

            country,

            isDefault

        });

        return res.status(201).json({

            success: true,

            message: "Address added successfully",

            address

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const getAddresses = async (req, res) => {

    try {

        const addresses = await Address.find({
            user: req.user.id
        }).sort({
            isDefault: -1,
            createdAt: -1
        });

        return res.status(200).json({

            success: true,

            addresses

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getAddressById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Address ID"

            });

        }

        const address = await Address.findOne({

            _id: id,

            user: req.user.id

        });

        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found"

            });

        }

        return res.status(200).json({

            success: true,

            address

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



const updateAddress = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Address ID"
            });

        }

        if (req.body.isDefault) {

            await Address.updateMany(

                { user: req.user.id },

                { isDefault: false }

            );

        }

        const updatedAddress = await Address.findOneAndUpdate(

            {
                _id: id,
                user: req.user.id
            },

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedAddress) {

            return res.status(404).json({

                success: false,

                message: "Address not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Address updated",

            address: updatedAddress

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



const deleteAddress = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({

                success: false,

                message: "Invalid Address ID"

            });

        }

        const deletedAddress = await Address.findOneAndDelete({

            _id: id,

            user: req.user.id

        });

        if (!deletedAddress) {

            return res.status(404).json({

                success: false,

                message: "Address not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Address deleted"

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const setDefaultAddress = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Address ID"
            });

        }

        await Address.updateMany(
            { user: req.user.id },
            { isDefault: false }
        );

        const address = await Address.findOneAndUpdate(

            {
                _id: id,
                user: req.user.id
            },

            {
                isDefault: true
            },

            {
                new: true
            }

        );

        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found"

            });

        }

        return res.status(200).json({

            success: true,

            message: "Default address updated",

            address

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    addAddress, getAddresses, getAddressById, updateAddress, deleteAddress, setDefaultAddress
};