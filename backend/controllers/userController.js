
const express = require('express');
//below is used to express asynchandler which handles the errors like in controller and so automatically
const asyncHandler=require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require("../config/generateToken");


const registerUser=asyncHandler(async(req,res)=>{
const {name,email,password,pic}=req.body;

if(!name || !email ||!password){
    res.status(400);
    throw new Error("plz enter the details")
}

const userExists=await User.findOne({email});//here the USer is the model form models
//the findone will find the email from the database


//if user exist throw this error
if(userExists){
    res.status(400);
    throw new Error("user already exists");

}
//otherwise create the new user and query the database
const user=await User.create({
    name,
    email,
    password,
    pic,
})
if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)//token 
    }); //we are gonna send this to our user
  
}else{
    res.status(400);
    throw new Error("failed to create user")
}




});



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});


const allUsers=asyncHandler(async(req,res)=>{
  //it`s like the requseting the params form the url 
  //like api/login/user?search=piyush
  const keyword=req.query.search    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
//to access the specific query from it
  // console.log(keyword);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
})

module.exports={allUsers,registerUser,authUser};
//coating above with that handler

