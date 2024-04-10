const OTP = require('../models/OTP')
const User = require('../models/User')
const otpGenerator = require('otp-generator')

// send OTP

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