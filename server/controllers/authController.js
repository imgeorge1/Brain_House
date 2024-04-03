// const sendConfirmationEmail = require("../services/emailService");
const AdditionUserInfo = require("../models/AdditionUserInfoSchema");

const signup = async (req, res) => {
  try {
    const { email, age, city, phone } = req.body;

    const newUser = new AdditionUserInfo({
      email,
      age,
      city,
      phone,
    });

    await newUser.save();

    // await sendConfirmationEmail(newUser);

    console.log("New AdditionUserInfo saved: ", newUser);
  } catch (error) {
    console.error("Error in signup:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "User registration failed" });
  }
};

module.exports = signup;
