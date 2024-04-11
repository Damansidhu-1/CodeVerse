const Section = require("../models/Section");
const SubSection = require('../models/SubSection')
const {uploadImageToCloudinay} = require("../utils/imageUploader")
require("dotenv").config()

// create SubSection 
exports.createSubSection = async (req , res) => {

    try {
        
        // fetch data from Req body
        const {sectionId , title , timeDuration , description } = req.body 
        // extract file/video
        const video = req.files.videoFile;
        // validation
        if(!sectionId || !title || !timeDuration || !description || !video)
        {
            return res.status(400).json({
                success:false,
                message:"All sections are required",
            });
        }
        // upload video to cloudinary
        const UploadDetails = await uploadImageToCloudinay(video , process.env.FOLDER_NAME)
        // create subsection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: UploadDetails.secure_url,
        })
        // upadate section with this subsection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    subSection:SubSectionDetails._id,
                }
            },
            {new:true},
        )
        // TODO : use populate to replace subsection in updatedSection
        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection created Successfully ",
            updatedSection,
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable To create SubSection , Please try again",
            error:error.message,
        })
    }

}

//TODO: update SubSection
//TODO: DELETE SubSection

