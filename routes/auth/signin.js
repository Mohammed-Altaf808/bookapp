const express = require('express')
const router = express.Router()
const User = require('../../models/user')


router.get('/' , (req , res)=>{
    res.render("signin")
  })

router.post('/' ,async (req , res, next)=>{
    const { email , password } = req.body
    try{
    if(!email || !password){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return next(error)
    }

    const findUser = await User.findOne({ email })
    if(!findUser){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return next(error);
    }

    const pwd = findUser.password === password;
    if(!pwd){
        const error = new Error("wrong credential");
        error.status = 400;
        return next(error);
    }
    res.redirect(`/auth/signin/${findUser.username}`)
    // res.redirect('/books')
}catch(error){
        res.send(error)
    }   
})

router.get('/:username', async ( req,res)=>{
    try{
    const { username } = req.params;
    const userData =await User.findOne({ username })
    if (!userData) {
        res.status(404).json({message : "not found"})
    }
    res.render('user' , { userData })
    }catch(error){
        res.send(error)
    }
})

module.exports = router;