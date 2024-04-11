const Profile = require('../models/Profile')
const User = require('../models/User')

exports.updateProfile = async (req , res) => {

    try {
        
        // get data 
        const {dateOfBirth="" , about ="" , contactNumber , gender} = req.body;
        // get userId
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // find Profile (because profile is already created)
        const userDetail = await User.findById(id);
        const profileId = userDetail.additionalDetails;
        const profileDetails = await User.findById(profileId);
        // Update Profile ( because profile is already created )
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated succesfully",
            profileDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Profile updation Failed",
            error:error.message,
        });
    }

};


// *** Delete Account ****
exports.deleteAccount = async (req , res) => {

    try {
        
        // get id
        const id = req.user.id;
        // validation
        const userDetail = await User.findById(id);
        if(!userDetail)
        {
            return res.status(404).json({
                success:false,
                message:"User not Found",
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
        // delete user
        await User.findByIdAndDelete({_id:id});

        // TODO: unrol student from total students enrolled
        // TODO: schedule this deletion 
        // TODO:Cronjob 

        // return res
        return res.status(200).json({
            success:true,
            message:"User deleted Successfully",
            
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Cannot be deleted",
            error:error.message,
        });
    }

}