const Category = require("../models/Category")

// create Category da handler function likhna 


exports.createCategory = async (req ,res )=> {

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
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"Category created Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }

};

// getAllCategories
exports.showAllCategories = async (req , res) => {
    
    try {
        
        const allCategories = await Category.find({} ,{name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All Categories returned Successfully",
            allCategories,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}