const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const booksRoute = require("./routes/books") 
const signupRoute = require("./routes/auth/signup")
const signinRoute = require("./routes/auth/signin")

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

app.use("/books" , booksRoute)
app.use("/user" , signupRoute)
app.use("/user" , signinRoute)

app.get('/',(req , res)=>{
  console.log("home page")
  res.send('Home page')
})

app.listen(3000 ,()=>{
  console.log('port 3000 is live')
})