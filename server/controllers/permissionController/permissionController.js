const User = require("../../models/userSchema");

const allowedNextCategory = async (req, res) => {
  try {
    const { completed, email } = req.body;
    const user = await User.findOne({ email: email });
    user.completed = completed;
    console.log("allow user", { email: email, completed: completed });

    await user.save();

    res.status(200).json({ message: "Permission granted", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = allowedNextCategory;
