const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require("../models/SubSections")


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
        const updatedCourse = await Course.findByIdAndUpdate(
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
            updatedCourse,
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
        const { sectionName, sectionId, courseId } = req.body
        // update data
        const section = await Section.findByIdAndUpdate(
                                                    sectionId,
                                                    {sectionName},
                                                    {new:true},
                                                )
        const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
        console.log(course)
        // retrun response
        return res.status(200).json({
            success:true,
            message: section,
            data: course,
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
exports.deleteSection = async (req, res) => {
    try {
      const { sectionId, courseId } = req.body
      await Course.findByIdAndUpdate(courseId, {
        $pull: {
          courseContent: sectionId,
        },
      })
      const section = await Section.findById(sectionId)
      console.log(sectionId, courseId)
      if (!section) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        })
      }
      // Delete the associated subsections
      await SubSection.deleteMany({ _id: { $in: section.subSection } })
  
      await Section.findByIdAndDelete(sectionId)
  
      // find the updated course and return it
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.status(200).json({
        success: true,
        message: "Section deleted",
        data: course,
      })
    } catch (error) {
      console.error("Error deleting section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }