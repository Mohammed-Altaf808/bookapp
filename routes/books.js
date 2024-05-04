const express = require("express")
const router = express.Router()
const book = require("../models/book")
const User = require("../models/user")

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  try {
    const books = new book(req.body)
    await books.save()
    res.redirect(`/books/${books._id}`)
  }
  catch (error) {
    res.send(error)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const books = await book.findById(id);
    if (!books) {
      res.status(400).json({ message: "book not found" })
    }
    res.render('edit', { books })
  } catch (error) {
    res.send(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const books = await book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    if (!books) {
      res.status(404).json({ message: "book not found" })
    }
    res.redirect(`/books/${books._id}`);
  } catch (error) {
    res.send(error)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const books = await book.findByIdAndDelete(id)
  res.redirect('/books')
})

module.exports = router