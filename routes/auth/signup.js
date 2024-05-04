const express = require("express")
const router = express.Router()
const user = require('../../models/user')
const bcrypt = require("bcrypt")
// const { find, findById } = require("../../models/book")
const mongoose = require("mongoose") 

router.get('/' , (req , res)=>{
  res.render("signup" , {error : null})
})

router.post('/' ,async (req , res)=>{
  try{
    const { email ,username , password} =req.body;
    const finduser = user.findOne({email})
    if(email || username){
      const error = new Error({message : "Email exist, try to login"})
      return res.render("signup" , {error : "User already exist try to change username or email"})
    }
    const hash =await bcrypt.hash(password, 12)
    const Newuser = new user({
      email,
      username,
      password : hash
    })
    await Newuser.save()
    res.redirect(`/user/${Newuser.username}`)
  }catch(error){
    res.send(error)
  }
})

module.exports = router