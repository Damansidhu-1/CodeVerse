const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    acountType:{
        type:String,
        enum:["Admin" , "Student" , "Instructor"],
        required:true 
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Profile',
    },
    course:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Courses',
        }
    ],
    image:{
        type:String,
        required:true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'CoursesProgress',
        }
    ]  
});

module.exports = mongoose.model("User" , userSchema );