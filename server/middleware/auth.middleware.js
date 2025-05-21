import { getSession } from "@auth/express";
import authConfig from "../src/config/auth.config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export async function authenticatedUser(req, res, next) {
//   // console.log(req.headers.cookie);
//   const session =
//     res.locals.session ?? (await getSession(req, authConfig)) ?? undefined;

//   // console.log("authenticatedUser>>>>>>>>>>>>>", session);
//   res.locals.session = session;

//   if (session) {
//     return next();
//   }

//   res.status(401).json({ message: "Not Authenticated" });
// }

export async function currentSession(req, res, next) {
  const session = (await getSession(req, authConfig)) ?? undefined;
  // console.log("currentSession>>>>>>>>>>>>>", session);
  res.locals.session = session;
  return next();
}

// middleware/authMiddleware.ts

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader>>>>>>>>>>>>>", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // you can access this in any route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
