import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "brainhouse2021@gmail.com",
    pass: "vjqi ayfz zemw hbcv",
  },
  tls: {
    rejectUnauthorized: false, // Add this line to accept self-signed certificates (NOT recommended)
  },
});

const sendConfirmationEmail = async (user) => {
  const mailOptions = {
    from: "brainhouse2021@gmail.com",
    to: user.email,
    subject: "Registration Successful",
    text: "Thank you for registering with our app!",
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
