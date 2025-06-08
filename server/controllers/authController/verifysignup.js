import mongoConnection from "../../db/mongoConnection.js";
import sendVerificationEmail from "../../services/verifyEmail.js";
import { encryptCode } from "../../utils/codeEncryptor.js";

const { models } = await mongoConnection();

const verifysignup = async (req, res) => {
  const { email, firstName } = req.body;
  console.log("vrify email???", email);

  try {
    const user = await models.User.findOne({ email });
    if (user) return res.status(404).json({ message: "User alredy exist" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await sendVerificationEmail({
      email: email,
      firstName: firstName,
      code,
    });

    const token = encryptCode(email, code);

    return res.status(200).json({ message: "Code sent", token });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifysignup;
