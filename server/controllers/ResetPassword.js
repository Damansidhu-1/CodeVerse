const User = require('../models/User')
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');


//resetPassword Token
exports.resetPasswordToken = async (req , res) => {

    try {
        
        // get from request di body

        const email = req.body.email
        const user = await User.findOne({email: email})

        
        // check is user for that user is present
        if(!user)
        {
            return res.json({
                success:false,
                message:"Your email is not registered with us"
            });
        }
        // generate token 

        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email: email} ,
                                                            {
                                                                token:token,
                                                                resetPasswordExpires:Date.now()+5*60*1000,
                                                            },{new:true});
        console.log("DETAILS", updatedDetails);
        // create url 
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url 
        await mailSender(email ,
                        "Password Reset Link" ,
                        `Password Reset Link: ${url}` )
        // retrun response

        return res.json({
            success:true,
            message:"Email Sent successfully ,Please check email and change password",
            url,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            // message:"Something went wrong while restting password",
            message:error.message,
        });
    }

}


//resetPassword

exports.resetPassword = async (req , res) => {
    
    try {

        // fetch data
        const {password , confirmPassword , token} = req.body;
        // validation
        if(password !== confirmPassword)
        {
            return res.json({
                success:false,
                message:"Password not matching",
            });
        }
        // get user details of user from db using token
        const userDeails = await User.findOne({token: token})
        // if no entry invalid token
        if(!userDeails)
        {
            return res.json({
                success:false,
                message:"Token is Invalid",
            });
        }
        // check token time
        if(!(userDeails.resetPasswordExpires > Date.now())){
            
            return res.json({
                success:false,
                message:"Token is expired , please regenrate Token",
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password , 10);
        // password update
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new:true}
        );
        // return response
        return res.json({
            success:true,
            message:"Password reset is Successsfull",
        });

    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong while sending reset password mail",
        });
    }

}
