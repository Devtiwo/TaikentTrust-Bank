const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  } 
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Server is not ready to send emails", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

const resetPasswordEmail = (user, resetLink) => {
  return transporter.sendMail({
    from: `TitanTrust <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Reset your password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
        img {
          margin: 0 auto 30px;
          display: block;
          height: 90px;
        }
        body {
          font-family: Roboto, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          padding: 10px;
        }
        h1 { text-align: center; }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #f8f9f9;
          padding: 20px;
        }
        .reset-button {
          width: 180px;
          background-color: #1891c8;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          margin: 25px auto;
          font-weight: 700;
          cursor: pointer;
          display: block;
          text-align: center;
        }
        p { 
          line-height: 1.5;
          font-size: 15px;
        }
       </style>
     </head>
     <body>
       <div class="container">
         <img src="https://imgur.com/SuiJUHE.png" alt="logo" />
         <h1>Password Reset Request</h1>
         <p>Hi ${user.fname}</p>
         <p>This email is to confirm that you requested a password reset. To complete the process, click on the button below</p>
         <a href=${resetLink} class="reset-button">Reset Password</a>
         <p>If you did not request a password reset, please ignore this email.</p>
         <p>Thank you</p>
       </div>
     </body>
     </html>
    `
  });
};

const passwordChangeEmail = (user) => {
  return transporter.sendMail({
    from: `TitanTrust <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "You've changed your password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          img {
            margin: 0 auto 30px;
            display: block;
            height: 90px;
          }
          body {
            font-family: Roboto, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 10px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9f9;
            padding: 20px;
          }
          p { 
            line-height: 1.5;
           font-size: 15px;
          }
       </style>
     </head>
     <body>
       <div class="container">
         <img src="https://imgur.com/SuiJUHE.png" alt="logo" />
         <p>Hi ${user.fname}</p>
         <p>Your password has been changed successfully. If you didn't make this change, please contact support immediately.</p>
         <p>Thanks for using our services.</p>
       </div>
     </body>
     </html>
    `
  });
};

module.exports = { resetPasswordEmail, passwordChangeEmail };