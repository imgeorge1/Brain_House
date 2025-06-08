import { decryptCode } from "../../utils/codeEncryptor.js";

const confirm = async (req, res) => {
  const { code, token } = req.body;
  console.log(code, token);

  try {
    const { code: storedCode, expiresAt } = decryptCode(token);

    if (Date.now() > expiresAt) {
      return res.status(400).json({ message: "Code expired" });
    }

    if (code !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Code verification error:", error);
    return res.status(400).json({ message: "Invalid or tampered token" });
  }
};
export default confirm;
