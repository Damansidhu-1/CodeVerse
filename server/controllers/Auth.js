const OTP = require('../models/OTP')
const User = require('../models/User')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
require('dotenv').config();

// ******** send OTP *********

exports.sendotp = async (req ,res) => {

    try {

        const {email} = req.body;

        // check if user is present 
        const checkUserPresent = await User.findOne({email});

        // if user already exists retrun , then retrun a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                mesaage:"User already registered",

            })
        };

        // generate OTP
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,

        });
        console.log("OTP Generated : " , otp);

        // check if otp is unique

        const result = await OTP.findOne({otp : otp});
        
        while(result){
            var otp = otpGenerator.generate(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
    
            });

            result = await OTP.findOne({otp : otp});
        }

        const otpPayload = {email , otp};

        //create an enrty in database
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);


        // return res
        return res.status(200).json({
            sucess:true,
            message:'OTP sent succesfully',
            otp,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            mesaage:error.message,
        })
    }


};

// ***** SIGN UP *********

exports.signup = async (req ,res ) => {

    try {
        
        // data fetch from request body 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            acountType,
            contactNumber,
            otp 
        } = req.body;

        //validate karo
        if(!firstName || !lastName || !email || !password || !confirmPassword || ! otp)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }

        //match 2 passwords 
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword doesnot match , Please try Again"
            })
        }

        //check if user already exists or not 
        const exsistingUser = await User.findOne({email});

        if(exsistingUser){
            return res.status(400).json({
                success:false,
                message:"User is Already registered"
            })
        }

        // find most recent otp form db
        // after find query is written to get most recent OTP stored for that specific email
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        // validate otp
        if(recentOtp.length == 0)
        {
            // otp not found 
            return res.status(400).json({
                success:false,
                message:"OTP not found ", 
            })
        } 
        else if(otp !== recentOtp)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid OTP  ", 
            })
        }

        // hash password 
        const hashedPassword = await bcrypt.hash(password , 10);


        // create entry in body of user

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            acountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return res
        return res.status(200).json({
            success:true,
            message:"user is registered succesfully ",
            user,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"user cannot be registered, Please try again"
        })
    }
    
};

// ****** LOGIN ******

exports.login = async (req , res) => {
    
    try {
        
        // get data form req body 

        const {email, password} = req.body ;

        // validation of data 

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All fields are required ,Please try Again',

            });
        }

        //check if user exists 

        const user = await User.findOne({email}). populate("additionalDetialas");
        if(!user){
            return res.status(401).json({
                success:false,
                mesaage:'User is not Registered ,Please signup First',
            });
        }

        // generate jwt token , after matchng password

        if(await bcrypt.compare(password , user.password)){

            const payLoad = {
                email: user.email,
                id:user._id,
                acountType:user.acountType ,
            }

            const token = jwt.sign(payLoad , process.env.JWT_SECRET , {
                expiresIn:"2h"
            })

            user.token = token; 
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            
            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in succesfully',
            })
        }
        else{
            return res.status(401).json({
                succcess:false,
                message:"Password is incoorect",
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500 ).json({
            succcess:false,
            message:"Login failiure , Please try again",
        });
    }
}

// ***** change password ****
exports.changePassword = async (req, res) => {

    // get data from req body 
    //get oldPassword , newPassword , confirmPassword
    // validation
    
    // update password in db
    //send mail --> Password updated
    //retrun response

    try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}

}