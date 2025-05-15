const mongoose = require('mongoose');

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
    },
   image: {
    data: Buffer,
    contentType: String
  }

})


const book = mongoose.model('book' , bookschema);
module.exports = book; 