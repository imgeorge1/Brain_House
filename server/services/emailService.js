import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shvangiradze22giorgi@gmail.com",
    pass: "yegb cuyy seqq ahyy",
  },
  // tls: {
  //   rejectUnauthorized: false, // Add this line to accept self-signed certificates (NOT recommended)
  // },
});

const sendConfirmationEmail = async (user) => {
  // console.log(user);
  const mailOptions = {
    from: "shvangiradze22giorgi@gmail.com",
    to: user.email,
    subject: "Welcome to our app | We're glad to have you!", // More natural subject
    text: `Hi ${user.firstName},\n\nThank you for joining us! Let us know if you have any questions.\n\nBest,\nBrain House's Team`,
    // Uncomment in production

    // headers: {
    //   "List-Unsubscribe": "<mailto:shvangiradze22giorgi@gmail.com>",
    // },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to: ", user.email);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
};

export default sendConfirmationEmail;
