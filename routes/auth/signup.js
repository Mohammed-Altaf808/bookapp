const express = require("express")
const router = express.Router()
const user = require('../../models/user')

router.get('/' , (req , res)=>{
  res.render("signup")
})

router.post('/' ,async (req , res)=>{
    const Newuser = new user(req.body)
    try{
    await Newuser.save()
    // res.status(200).json({ message : "log in "})
    res.redirect(`/user/${Newuser.username}`)
  }catch(error){
    
  }
})

// router.get('/:username', async ( req,res)=>{
//     const { username } = req.params;
//     const userData =await user.findOne({ username })
//     res.render('user' , { userData })
// })



module.exports = router