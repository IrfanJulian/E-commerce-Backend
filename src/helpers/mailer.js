/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const sendEmail = async(email, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  
    let info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: `Verification Account`,
      text: `This is your OTP code ${subject} you can go back to our website to finish the validation`
    })
    console.log('email sent');
    console.log(info.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendEmail }