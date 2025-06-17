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

transporter.verify((err, success) => {
  if (err) {
    console.error("Nodemailer setup error:", err);
  } else {
    console.log("Nodemailer is ready to send emails");
  }
});

const sendVerifyCode = async (code, user) => {
  const mailOptions = {
    from: '"Brain House Team" <brainhousework@gmail.com>',
    to: user.email,
    subject: "Welcome to Brain House! We're glad to have you",
    text: `Hi ${user.firstName},\nThank you for joining us!\nBest,\nBrain House Team`,
    html: `<p>Hi <strong>${user.firstName}</strong>,</p>
           <p>Your verification code is: <strong>${code}</strong></p>
           <p>Thank you for joining us!</p>
           <p>Best,<br>Brain House Team</p>`,
    headers: {
      "List-Unsubscribe": "<mailto:brainhousework@gmail.com>",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to: ", user.email);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
};

export default sendVerifyCode;
