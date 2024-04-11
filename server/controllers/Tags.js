const Tag = require("../models/Tags")

// create tag da handler function likhna 


exports.createTag = async (req ,res )=> {

    try {
        
        // fetch data from request ki body 
        const {name , description } = req.body;

        // validation
        if(!name || ! description)
        {
            return res.status(500).json({
                success:false,
                message:"All fields are required",
            })
        }

        // create entry in DB
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"Tag created Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }

};

// getAllTags
exports.showAlltags = async (req , res) => {
    
    try {
        
        const allTags = await Tag.find({} ,{name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All Tags returned Successfully",
            allTags,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}