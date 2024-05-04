const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require("bcrypt")



router.get('/', (req, res) => {
    res.render("signin", { error: null }); 
});

router.post('/' ,async (req , res, next)=>{
    try{
    const { email , password } = req.body
    if(!email || !password){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return res.render("signin", { error: "Credentials are incorrect" });
    }
    
    const findUser = await User.findOne({ email })
    if(!findUser){
        const error = new Error("credentials are incorrect")
        error.status = 400;
        return res.render("signin", { error: "Credentials are incorrect" });
    }
    const validpasword =await bcrypt.compare(password , findUser.password )
    if(!validpasword){
        const error = new Error("Wrong credential");
        error.status = 400;
        return res.render("signin", { error: "Wrong credential" });
    }

    res.redirect(`/auth/signin/${findUser.username}`)
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
    res.render('user' , { userData } )
    }catch(error){
        res.send(error)
    }
})

module.exports = router;