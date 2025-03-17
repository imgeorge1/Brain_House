import User from "../../models/userSchema.js";
import sendConfirmationEmail from "../../services/emailService.js";

const users = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserPaidStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { isPaid } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isPaid },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else if (user.isPaid === true) {
      sendConfirmationEmail(user);
    }

    console.log("Change Paid Status: ", user.email);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { users, updateUserPaidStatus };
