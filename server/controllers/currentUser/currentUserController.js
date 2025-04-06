import User from "../../models/userSchema.js";

const currentUser = async (req, res) => {
  try {
    const session = res.locals.session;
    console.log("sesssioooon......", session);
    console.log("requeeessst......", req.session);
    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ error: "Not authenticated" });
    }
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
