import mongoConnection from "../../db/mongoConnection.js";
import { comparePasswords } from "../../utils/hash.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";

const { models } = await mongoConnection();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await comparePasswords(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());

    // Set HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default login;
