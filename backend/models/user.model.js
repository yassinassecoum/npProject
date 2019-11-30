//user data structure

const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email :{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:6
    },
    password :{
        type:String,
        required:true,
        unique:false,
        trim:true,
        minlength:4
    },
    power :{
        type:Number,
        required:false,
        unique:false,
        trim:true,
        minlength:1
    }
    
},{
    timestamps:true,
})
const User=mongoose.model('User',userSchema);

module.exports=User;