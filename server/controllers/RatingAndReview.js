const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require('mongoose')

// createRating
exports.createRating = async(req , res) => {

    try {
        
        // get userId
        const userId = req.user.id;
        // fetch data from req body
        const {rating , review , courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await  Course.findOne(
                                                {_id:courseId,
                                                    studentsEnrolled:{$elemMatch : {$eq: userId}}
                                                },
                                            )
            
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course"
            });
        }
        // check if user already reviewed the course
        const alreadReviewed = await RatingAndReview.findOne({
                                                    userId:userId,
                                                    course:courseId,
                                                })
        if(!alreadReviewed){
            return res.status(403).json({
                success:false,
                message:"course is already reviewed by the user"
            });
        }                                   
        // create ratingAndReview
        const ratingReview = await RatingAndReview.create({
                                            rating,review,
                                            course:courseId,
                                            user:userId,
                                        })
    // Add the rating and review to the course
    await Course.findByIdAndUpdate(courseId, {
        $push: {
          ratingAndReviews: ratingReview,
        },
      })
      await courseDetails.save()
        console.log(updatedCourseDetails);
        // return response
        return res.status(201).json({
            success:true,
            message:"Rating And Review created successfully",
            ratingReview,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

// getAverageRating
exports.getAverageRating = async (req , res)=>{

    try {
        
        // get courseId
        const courseId = req.body.courseId;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg: "$rating"},
                }
            }
        ])

        // return rating
        if(result.length > 0){

            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })

        }

        // if no review/rating exists 
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, No ratings given at all",
            averageRating:0,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }

}



//getAllRatingAndReview

exports.getAllRating = async (req , res) => {

    try {
        
        const allReview = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",

                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    })
                                    .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews Fetched Successfully",
            date:allReview, 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        });
    }

}