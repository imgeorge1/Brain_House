import User from "../../models/userSchema.js";

const currentUser = async (req, res) => {
  try {
    const session = req.cookies["__Secure-authjs.session-token"];
    console.log("SeSSIONNNN", session);
    const email = session.user.email;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      console.error("user not found");
      return res.status(404).json({ error: "User Not Found" });
    }

    const { firstName, lastName, completed, isPaid } = user;

    res.json({ firstName, lastName, email, completed, isPaid });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default currentUser;
