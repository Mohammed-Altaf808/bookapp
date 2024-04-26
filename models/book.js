const mongoose = require('mongoose');
// const user = require('./user');

const bookschema = new mongoose.Schema({
    title : {
        type : String, 
        require : true
    },
    author :
    { 
        type : String,
        require : true
    },
    genre :
    {
        type : String,
        require : true
    },
    description :
    { 
        type : String,
        require : true,
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})


const book = mongoose.model('book' , bookschema);
module.exports = book; 