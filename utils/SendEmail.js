
const dotenv = require('dotenv');
dotenv.config()
const nodemailer = require('nodemailer');

const SendEmail = async( email , subject , text )=>{

    try {

    const Transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

    })

    await Transpoter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:subject,
        text:text
    })

    console.log('email sent successfully')

        
    } catch (error) {

        console.log('error occured', error)
        
    }
}


module.exports = SendEmail

