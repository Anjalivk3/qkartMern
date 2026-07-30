const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");


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

const loginUser = async (req,res) =>{
  try {
    const {email, password} = req.body;
    //validation
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message: "Email and Password are required"
      })
    }

    // check if user exists 
    const existingUser = await userModel.findOne({email})
    if(!existingUser){
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect"});
    }

    //compare password
    const verifyPassword = await bcrypt.compare(password, existingUser.password);

    if(!verifyPassword){
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect"});
    }

     
    // email and password is valid so return a token
    // use jwt
    const token = jwt.sign(
      {id: existingUser._id, role: existingUser.role }, 
      process.env.JWT_SECRET,{
        expiresIn: "7d"
      });

    

    const userResponse = {
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role
    };

      return res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully",
      user: userResponse,
      token
    });
    
  } catch (error) {
      return res.status(500).josn({success: false,
      message: error.message
    });
  }
};

const getProfile = async (req,res) =>{
  //console.log("getProfile");
  try {
      const user = await userModel.findById(req.user.id).select("-password") ;
      return res.status(200).json({success: true, user});
    
  } catch (error) {
      return res.status(500).josn({success: false,
      message: error.message
    });
  }
}


module.exports = {registerUser, loginUser, getProfile}


