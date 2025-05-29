import mongoConnection from "../../db/mongoConnection.js";
import sendVerificationEmail from "../../services/verifyEmail.js";
import { encryptCode } from "../../utils/codeEncryptor.js";

const { models } = await mongoConnection();

const verify = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await models.User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await sendVerificationEmail({
      email: user.email,
      firstName: user.firstName,
      code,
    });

    const token = encryptCode(user.email, code);

    return res.status(200).json({ message: "Code sent", token });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verify;
