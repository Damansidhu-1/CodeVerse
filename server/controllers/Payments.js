const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templtes/courseEnrollmentEmail')
const mongoose = require('mongoose')



// capture the payment and initiate razorpay order
exports.capturePayment = async (req , res) => {
    

        
        // get courseId and userId 
        const {course_id} = req.body;
        const userId = req.user.id
        // validation
        // valid courseId
        if(!course_id){
            return res.json({
                success:false,
                message:"Please provide valid course id",
            });
        }
        // valid CourseDetail
        let course
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course",
                });
            }

            // check if user alreay paid for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled",
                });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
        // create order
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            note:{
                courseId: course_id,
                userId,
            }
        };

        try {
            
            // initiate payment using Razorpay
            const paymentResponse = await instance. orders.create(options);
            console.log(paymentResponse);
            // return response
            return res.status(200).json({
                success:true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })

        } catch (error) {
            console.log(error);
            res.json({
                success:false,
                message:"could not initiate order"
            })
        }

};

// verify signature of Razorpay and Server

exports.verifySignatue = async (req , res) => {
    // server teh pea
    const webhookSecret = "12345678";

    // eh raazor pay toh aea
    const signature = req.header["x-razorpay-signature"];

    // hmac = hashed based mesaage authentication code
    const shasum =  crypto.createHmac("sha256" , webhookSecret );
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex"); 

    
    if(signature === digest){
        console.log("Payment is Authrised");

        const{courseId , userId} = req.body.payload.entity.notes;

        try {
            
            // fulfil the action

            // find the course and enroll the student in it 
            const enrolledCourse = await Course.findOneAndUpdate(
                                                        {_id: courseId},
                                                        {$push:{studentsEnrolled: userId}},
                                                        {new:true},
                                                    );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                });
            }

            console.log(enrolledCourse);

            // find the student and add the course to their list of enrolled courses
            const enrolledStudent = await Course.findOneAndUpdate(
                                                    {_id: userId},
                                                    {$push:{courses: courseId}},
                                                    {new:true},
                                                );

            console.log(enrolledStudent);

            // mail send kardo onfirmation walla
            const emailRespnse = await mailSender(
                enrolledStudent.email,
                "Congratulation form CodeVerse",
                "Congratulation , You are onboard into neew CodeVerse Course",
            );

            console.log(emailRespnse);
            return res.status(200).json({
                success:true,
                message:'Signature verifed and course Added to list '
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }

    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid Request",
        });
    }

}
