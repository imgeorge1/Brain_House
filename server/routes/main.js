import express from "express";
import authRoutes from "./authRoutes.js";
import { currentSession } from "../middleware/auth.middleware.js";
import { ExpressAuth } from "@auth/express";
import authConfig from "../src/config/auth.config.js";
import {
  errorHandler,
  errorNotFoundHandler,
} from "../middleware/error.middleware.js";

const router = express.Router();

router.use(currentSession);

router.use("/api/auth/*", ExpressAuth(authConfig));
router.get("/api/auth/callback/google");

router.use("/", authRoutes);
// router.get("/", (req, res) => {
//   console.log("Root route accessed!");

//   try {
//     // Extract the token from cookies (if using cookie-based auth)
//     const token = req.cookies["authjs.session-token"];
//     const session = res.locals.session;
//     console.log("current session ........", session.user.email);
//     if (!token) {
//       return res.redirect("http://localhost:5173/");
//     }

//     // console.log("Auth token:", token);

//     // Redirect to frontend with token as a query parameter
//     res.redirect(`http://localhost:5173/?jwtToken=${token}`);
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//     res.redirect("http://localhost:5173/login?error=auth_failed");
//   }
// });

export default router;
