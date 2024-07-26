const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({
    
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    completedVideo: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSections",
        }
    ]
});
 
module.exports = mongoose.model("CoursesProgress" , courseProgress );