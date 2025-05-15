const express = require('express')
const router = express.Router()
const book = require('../models/book')
const user = require('../models/user')
router.get("/:username/:author", async (req, res) => {
  try {

    const { username } = req.params;
    const userData = await user.findOne({ username })
    if (!userData) {
      res.status(404).json({ message: "books not found" })
    }
    const { author } = req.params
    const books = await book.findOneAndUpdate({ author }, { userID: userData._id }, { new: true })
    res.render('show', { userData, books })
  }
  catch (error) {
    res.send(error)
  }
})

router.get('/:username', async (req, res) => {
  try{
  const { username } = req.params;
  const userData = await user.findOne({ username })
  res.redirect(`/${userData.username}/books`)
  }catch(error){
    res.send(error)
  }
})

module.exports = router
