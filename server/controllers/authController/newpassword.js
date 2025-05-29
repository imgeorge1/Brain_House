import mongoConnection from "../../db/mongoConnection.js";
import { hashPassword } from "../../utils/hash.js";

const { models } = await mongoConnection();

const newpassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email და პაროლი სავალდებულოა." });
  }

  try {
    const user = await models.User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "მომხმარებელი ვერ მოიძებნა." });
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "პაროლი წარმატებით განახლდა." });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "შიდა სერვერის შეცდომა." });
  }
};

export default newpassword;
