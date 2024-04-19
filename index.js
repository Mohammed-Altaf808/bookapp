const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const book = require('./book')
const methodOverride =require('method-override')

mongoose.connect('mongodb://localhost:27017/shopApp')
.then(() => {
console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
console.log("OH NO MONGO CONNECTION ERROR!!!!")
console.log(err)
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

app.get('/',(req , res)=>{
  console.log("home page")
  res.send('Home page')
})

app.get('/books' , async(req ,res)=>{
  const books = await book.find({})
  res.render('index',{ books })
})

app.get('/books/new',(req , res)=>{
  res.render('new')
})

app.get('/books/:id', async(req , res)=>{
  const { id } = req.params;
  const books = await book.findById(id)
  res.render('show' ,{books})
})

app.post('/books', async(req , res)=>{
  const books = new book(req.body)
  await books.save()
  res.redirect(`/books/${books._id}`)
})

app.get('/books/:id/edit',async (req , res)=>{
  const {id} =req.params;
  const books = await book.findById(id);
  res.render('edit', {books})
})

app.put('/books/:id', async (req , res)=>{
  const {id} = req.params;
  const books= await book.findByIdAndUpdate(id , req.body, {runValidators : true, new:true})
  res.redirect(`/books/${books._id}`);
})

app.delete('/books/:id',async(req , res)=>{
  const {id} = req.params;
  const books = await book.findByIdAndDelete(id)
  res.redirect('/books')
})

app.listen(3000 ,()=>{
  console.log('port 3000 is live')
})