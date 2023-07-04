const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    date:{
        type:Date
    }

});


const users = new mongoose.model("users",userSchema);


module.exports=users;