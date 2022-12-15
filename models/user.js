const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
        
    },
    profilePic:{
        type:String,
        required:false,
    },
}, {timestamps:true})

const User = mongoose.model('User', UserSchema);

module.exports = User;