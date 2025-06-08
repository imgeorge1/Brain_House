import dotenv from "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.error("Nodemailer setup error:", err);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});

const sendVerificationEmail = async ({ email, firstName, code }) => {
  const mailOptions = {
    from: '"Brain House Team" <brainhousework@gmail.com>',
    to: email,
    subject: "Your Verification Code from Brain House",
    text: `Hi ${firstName},\n\nYour verification code is: ${code}\n\nPlease enter this code to verify your email.\n\nBest,\nBrain House Team`,
    html: `<p>Hi <strong>${firstName}</strong>,</p>
           <p>Your verification code is: <strong>${code}</strong></p>
           <p>Please enter this code to verify your email.</p>
           <p>Best,<br>Brain House Team</p>`,
    headers: {
      "List-Unsubscribe": "<mailto:brainhousework@gmail.com>",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export default sendVerificationEmail;
