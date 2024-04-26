const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const booksRoute = require("./routes/books") 
const signupRoute = require("./routes/auth/signup")
const signinRoute = require("./routes/auth/signin")
const uniRoute = require("./routes/unibooks")


const User = require('./models/user')
const book = require("./models/book")

const dotenv = require('dotenv')
dotenv.config()

const methodOverride =require('method-override')

mongoose.connect(process.env.DATABASE_URL)
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



app.use("/books", booksRoute);
app.use("/auth/signup" , signupRoute)
app.use("/auth/signin" , signinRoute)
app.use("/user" , uniRoute)

app.get("/:username/books", async (req, res) => {
  try {
    const { username } = req.params;
    const userData = await User.findOne({username})
    // Find the user data based on the username

    if (!userData) {
      return res.status(404).send("User not found");
    }
    
    // Find all books belonging to the user
    const books = await book.find({ userID: userData._id });
    
    // If there are no books belonging to the user, send an error response
    if (books.length === 0) {
      res.redirect(`/${userData.username}/new`)
    }
    
    // If there are books, send them as a response
    // res.send(books);
    res.render('index' , {books , userData})
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/:username/new',async (req , res)=>{
  const { username } = req.params;
  const userData = await User.findOne({username})
 res.render('new' , { userData })
})

app.post('/:username/books', async(req , res)=>{
  try{
    const { username } = req.params;
    const userData = await User.findOne({username})
    const books = new book(req.body)
    await books.save()
    res.redirect(`/user/${userData.username}/${books.author}`)
  }
  catch(error){
  res.send(error)
 }
})

app.get("/:username/books/:id" , async(req , res)=>{
 try{
   const { username } = req.params;
  const userData = await User.findOne({username})
  const {id} = req.params
  const books = await book.findById(id)
  if (!books) {
    res.status(404).json({message : "books not found"})
  }
  // res.send(books)
  res.render('show' ,{books , userData})
}
catch(error){
  res.send(error)
}
})


app.delete('/:username/books/:id',async(req , res)=>{
  const { username } = req.params;
  const userData = await User.findOne({username})
  const {id} = req.params;
  const books = await book.findByIdAndDelete(id)
  res.redirect(`/${userData.username}/books`)
})

app.get('/home',(req , res)=>{
  console.log("home page")
  res.render('home')
})

app.listen(process.env.PORT ,()=>{
  console.log('port 3000 is live')
})


