import AdditionUserInfo from "../../models/AdditionUserInfoSchema.js";
import sendConfirmationEmail from "../../services/emailService.js";

const signup = async (req, res) => {
  try {
    const { fullName, email, age, city, phone } = req.body;

    const newUser = new AdditionUserInfo({
      fullName,
      email,
      age,
      city,
      phone,
    });

    await newUser.save();

    await sendConfirmationEmail(newUser);

    console.log("New AdditionUserInfo saved: ", {
      fullName,
      email,
      age,
      city,
      phone,
    });

    res
      .status(200)
      .json({ status: "success", message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "User registration failed" });
  }
};

export default signup;
