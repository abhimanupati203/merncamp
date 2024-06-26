const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');

const User = require('../models/user');

exports.signup = async (req, res)=>{
    const userExists = await User.findOne({ email: req.body.email});
    if(userExists){
         return res.status(403).json({error:"Email is already exists"});
    }
    const user = await new User(req.body);
     await user.save();
     res.status(200).json({message:'User saved successfull'});
};

exports.sigin =(req, res)=>{
    //find the user based on email
     const { _id, name, email, password } =req.body;
     User.findOne({email}, (err, user)=>{


    // if error or no user
    if(err || !user){
        return res.status(401).json({
            error:"User with that email doesn't exist. Please signin."
        })
    }

    // if userfound make sure that emaiil and password match
    // create authenticate method in model and use here
    if(!user.authenticate(password)){
        return res.status(401).json({
            error : "Email and password do not match"
        })
    }


    // generate a token with userid and secret

    const  token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

    //persist the token as `t` in cookie to frontend client
     
    res.cookie("t", token, {expire: new Date() + 9999 })

    // return response with user and token to frontend client   

  
    return res.json({token, user:{ _id,email,name}});
})
}

exports.signout = (req, res)=>{
    res.clearCookie("t");
    return res.json({message:"Signout success"});
}

exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,
    userProperty: 'auth'
})
