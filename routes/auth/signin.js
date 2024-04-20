const express = require('express')
const router = express.Router()
const user = require('../../models/user')


router.get('/signin' , (req , res)=>{
    res.render("signin")
  })

router.post('/signin' ,async (req , res)=>{
    const { email , password} = req.body
    try{
    if(!email || !password){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return next(error)
    }

    const emailid = await user.findOne({ email })
    if(!emailid){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return next(error);
    }

    const pwd = user.password === password;
    if(!pwd){
        const error = new Error("wrong credential");
        error.status = 400;
        return next(error);
    }
    // res.redirect("/user/signin")
        res.status(200).json({ message : "log in "})
}catch(error){
        res.send(error)
    }   
})

// router.get('/user/:username',async (res , req)=>{
//     const { username } = req.params;
//     const userData =await user.findOne({ username })
//     res.render('user' , { userData })
// })

module.exports = router