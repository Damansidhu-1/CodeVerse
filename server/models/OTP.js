const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expire:5*60,
    }
    
});

// a function to send email
async function sendVerificationMail(email , otp) {
    try {
        
        const mailResponse = await mailSender(email , "verification email from CodeVerse " ,otp);
        console.log('email sent succesfully' , mailResponse );

    } catch (error) {
        console.log("error occured while sending email");
        throw error

    }
}

OTPSchema.pre("save" , async function(next) {
    await sendVerificationMail(this.email , this.otp);
    next();
} )

module.exports = mongoose.model("OTP" , OTPSchema );