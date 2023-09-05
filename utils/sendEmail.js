const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

const mailTransporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Host de Outlook
  port: 587, // El puerto para Outlook generalmente es 587
  secure: false, 
  auth: {
    user: EMAIL_SENDER,
    pass: EMAIL_PASSWORD,
  },
});

const emailService = {
  sendEmail(verificationToken) {
    mailTransporter.sendMail(
      {
        from: EMAIL_SENDER,
        to: "jennigomez040@gmail.com",
        subject: "Authenticate your email",
        html: `<a href='http://localhost:3000/verify/${verificationToken}'>Verification email</a>`,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          console.log("An error occurred");
        } else {
          console.log("Email sent successfully");
          console.log("Verification email sent:", verificationToken);
        }
      }
    );
  },
};

module.exports = emailService;


