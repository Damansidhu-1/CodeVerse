const Course = require("../models/Course")
const Tag = require("../models/Tags")
const User = require("../models/User");
const {uploadImageToCloudinay} = require("../utils/imageUploader")

// create course handler
exports.createCourse = async (req, res) => {

    try {
        
        // fetch data from request body 
        const{courseName , courseDescription , whatYouWillLearn , price , tag} = req.body

        //get thumbnail 
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail)
        {
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : " , instructorDetails);
        //TODO:Verify that userId and instructorDetails._id are same or different ?
         
        if(!instructorDetails){
            return res.status(400).json({
                success: false,
                message:"Instructor Details Not found"
            });
        }

        // check given data is valid or not
        const tagDetails =  await Tag.findById(tag);
        if(!tagDetails){
            return res.status(400).json({
                success: false,
                message:"TAG Details Not found"
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinay(thumbnail , process.env.FOLDER_NAME)

        // create entry for course in DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,

        });

        // add the new to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new: true}
        )
        
        // update tag section
        // tobe done later

        // return response
        return res.status(200).json({
            success: true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message:"Failed to create Course",
            error:error.message,
        });
    }

}


// getAllCourses handler

exports.showAllCourses = async (req ,res) => {

    try {
        
        const allCourses = await Course.find( {} , {courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReviews:true,
                                                    studentsEnrolled:true,})
                                                    .populate("instructor")
                                                    .exec();

        return res.status(200).json({
            success: true,
            message:"Data for all courses fetched successfully",
            data:allCoursesCourse,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"cannot fetch course data",
            error:error.message,
        });
    }

}

