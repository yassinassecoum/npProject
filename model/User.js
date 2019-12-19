const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:4
    },
    email:{
        type:String,
        required:true,
        min:7
    },
    password:{
        type:String,
        required:true,
        min:4
    },
    power :{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userSchema);