const User = require("../models/userSchema");
// const sendConfirmationEmail = require("../services/emailService");
const AdditionUserInfo = require("../models/AdditionUserInfoSchema");

const signup = async (req, res) => {
  try {
    const { userId, age, city, phone } = req.body;
    const foundUsers = await User.findOne({ _id: userId });

    if (foundUsers) {
      await AdditionUserInfo.deleteOne({ userId: userId });
      console.log("Existing user deleted");
    }

    const newUser = new AdditionUserInfo({
      userId,
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
