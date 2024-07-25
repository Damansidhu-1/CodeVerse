const nodemailer = require("nodemailer");


const mailSender = async (email , title , body)=> {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: false,
        });

        // sending mail
        let info = await transporter.sendMail({
            from: `"CodeVerse " <${process.env.MAIL_USER}>`, // sender address
            to: `${email}`, // list of receivers
            subject: `${title}`, // Subject line
            html: `${body}`, // html body
          })
        console.log(info);
        return info;

    } catch (error) {
        console.error(error);
        return error.message
    }
}

module.exports = mailSender;