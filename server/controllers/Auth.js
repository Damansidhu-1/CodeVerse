const OTP = require('../models/OTP')
const User = require('../models/User')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')

// ******** send OTP *********

exports.sendOTP = async (req ,res) => {

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

exports.signUp = async (req ,res ) => {

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