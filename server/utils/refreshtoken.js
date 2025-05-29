import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createAccessToken } from "./jwt.js";

dotenv.config();

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    if (typeof payload === "object" && "userId" in payload) {
      const newAccessToken = createAccessToken(payload.userId);
      res.json({ accessToken: newAccessToken });
    } else {
      res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid token" });
  }
};

export default refreshToken;
