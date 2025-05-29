import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (typeof payload === "object" && "userId" in payload) {
      req.user = payload.userId;
      next();
    } else {
      res.status(401).json({ message: "Invalid token payload" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
