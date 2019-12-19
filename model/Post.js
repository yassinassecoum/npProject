const mongoose = require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:4
    },
    category:{
        type:String,
        required:true,
        min:4
    },
    description:{
        type:String,
        required:true,
        min:4
    },
    img:{
        type:String,
        required:false,
        min:4
    },
    user:{
        type:String,
        required:true,
        min:4
    },
    site:{
        type:String,
        required:true,
        min:4
    }
});

module.exports = mongoose.model('Post',postSchema);