const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const book = require('../models/book')
const user = require('../models/user')
router.get("/:username/:author" , async(req , res)=>{
    try{

      const { username } = req.params;
      const userData =await user.findOne({ username })
        if (!userData) {
          res.status(404).json({message : "books not found"})
        }
        // res.send(userData._id)
        const {author} = req.params 
        const books = await book.findOneAndUpdate({author} , {userID : userData._id}, { new: true })
        // res.send(bookData)
        // res.redirect(`/${userData.username}/${author.bookData}`)
        res.render('show' , { userData , books})
      }
      catch(error){
        res.send(error)
      }

})

router.get('/:username', async ( req,res)=>{
  const { username } = req.params;
  const userData =await user.findOne({ username })
  // res.render('user' , { userData })
res.redirect(`/${userData.username}/books`)
})

// router.get("/:username/:author", (req , res)=>{
//   res.render('unibooks' )
// })




module.exports = router
