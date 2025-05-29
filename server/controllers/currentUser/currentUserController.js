import mongoConnection from "../../db/mongoConnection.js";

const { models } = await mongoConnection();

export const currentUser = async (req, res) => {
  try {
    // Assuming your middleware sets req.user = { userId: '...' }
    const userId = req.user; // From middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await models.User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export default currentUser;
