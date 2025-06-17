import sendVerifyCode from "../../services/verifyemailcode.js"; // Add .js if using ES modules

const sendCode = async (req, res) => {
  const { user } = req.body;

  if (!user.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    await sendVerifyCode(code, user);

    return res.status(200).json({ message: "Code sent successfully" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return res.status(500).json({ error: "Failed to send code" });
  }
};

export default sendCode;
