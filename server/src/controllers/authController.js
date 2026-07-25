const bcrypt = require("bcrypt");
const userModel = require("../models/User");



const registerUser = async (req,res) =>{
  try {
    const {name, email, password} = req.body;
    //validation
    if(!name || !email || !password){
      return res.status(400).json({
        success:false,
        message: "All fields are required"
      })
    }

    // check existing user
    const existingUser = await userModel.findOne({email})
    if(existingUser){
      return res.status(409).json({
        success: false,
        message: "Email already Registered"});
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save/add user
    const savedUser = await userModel.create({name,email, password: hashedPassword});


    const userResponse = {
    _id: savedUser._id,
    name: savedUser.name,
    email: savedUser.email,
    role: savedUser.role
    };

      return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userResponse
    });
    
  } catch (error) {
      return res.status(500).josn({success: false,
      message: error.message
    });
  }
};

module.exports = {registerUser}


