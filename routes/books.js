const express = require("express")
const router = express.Router()
const book = require("../models/book")

router.get('/' , async(req ,res)=>{
    const books = await book.find({})
    res.render('index',{ books })
  })
  
  router.get('/new',(req , res)=>{
    res.render('new')
  })
  
  router.get('/:id', async(req , res)=>{
    const { id } = req.params;
    const books = await book.findById(id)
    res.render('show' ,{books})
  })
  
  router.post('/', async(req , res)=>{
    const books = new book(req.body)
    await books.save()
    res.redirect(`/books/${books._id}`)
  })
  
  router.get('/:id/edit',async (req , res)=>{
    const {id} =req.params;
    const books = await book.findById(id);
    res.render('edit', {books})
  })
  
  router.put('/:id', async (req , res)=>{
    const {id} = req.params;
    const books= await book.findByIdAndUpdate(id , req.body, {runValidators : true, new:true})
    res.redirect(`/books/${books._id}`);
  })
  
  router.delete('/:id',async(req , res)=>{
    const {id} = req.params;
    const books = await book.findByIdAndDelete(id)
    res.redirect('/books')
  })
  
module.exports = router