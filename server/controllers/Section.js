const Course = require('../models/Course');
const Section = require('../models/Section');


exports.createSection = async (req , res)=>{
    
    try {
        
        // data fetch 
        const {sectionName , courseId} = req.body;
        // data validation
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        // create section
        const newSection = await Section.create({sectionName})
        // update course with section id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push:{
                                                            courseContent:newSection._id
                                                        }
                                                    },
                                                    {new:true},
                                                ).populate({
                                                    path: "courseContent",
                                                    populate: {
                                                        path: "subSection",
                                                    },
                                                })
                                                .exec();
        
        // return response
        
        return res.status(200).json({
            success:true,
            message:"Section created Successfully ",
            updatedCourseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable To create Section , Please try again",
            error:error.message,
        })
    }

}

//Update Section

exports.updateSection = async (req , res) => {

    try {
        
        // data input
        const {sectionName , courseId} = req.body;
        // data validation
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Missing Properties",

            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(
                                                    courseId,
                                                    {sectionName},
                                                    {new:true},
                                                )
        // retrun response
        return res.status(200).json({
            success:true,
            message:"Section updated Successfully ",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable To Update Section , Please try again",
            error:error.message,
        })
    }

}

// ****** Delete section *****
exports.deleteSection = async (req , res) => {

    try {
        
        // get ID -- assuming that we are sending id in params
        const {sectionId} = req.params;
        // use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO [testing]:do we need to delete the entry from course Schema
        // return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully ",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable To Delete Section , Please try again",
            error:error.message,
        })
    }

}