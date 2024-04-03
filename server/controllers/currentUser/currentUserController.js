const User = require("../../models/userSchema");

const currentUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { firstName, lastName, completed, isPaid } = user;

    res.json({ firstName, lastName, email, completed, isPaid });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = currentUser;
