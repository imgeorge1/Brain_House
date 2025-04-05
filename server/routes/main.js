import express from "express";
import authRoutes from "./authRoutes.js";
import { currentSession } from "../middleware/auth.middleware.js";
import { ExpressAuth } from "@auth/express";
import authConfig from "../src/config/auth.config.js";
// import {
//   errorHandler,
//   errorNotFoundHandler,
// } from "../middleware/error.middleware.js";
const DEV_MODE = process.env.NODE_ENV === "developer";

const router = express.Router();

router.use(currentSession);

router.use("/api/auth/*", ExpressAuth(authConfig));

router.use("/", authRoutes);
// router.get("/", (req, res) => {
<<<<<<< HEAD
//   console.log("Root route accessed!");

//   try {
//     // Extract the token from cookies (if using cookie-based auth)
//     const token = req.cookies["authjs.session-token"];
//     const session = res.locals.session;
//     if (!token) {
//       // console.log("current session ........", session.user.email);
//       return res.redirect("http://localhost:5173/");
//     }

//     // console.log("Auth token:", token);

//     // Redirect to frontend with token as a query parameter
//     res.redirect(`http://localhost:5173/?jwtToken=${token}`);
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//     res.redirect("http://localhost:5173/login?error=auth_failed");
=======
//   // Check if the 'authjs.session-token' cookie exists
//   const token = req.cookies["authjs.session-token"];

//   if (token) {
//     // If the session token exists, redirect to the frontend
//     console.log("Session token found, redirecting to frontend...");
//     res.redirect(
//       DEV_MODE
//         ? `http://localhost:5173/?jwtToken=${token}`
//         : `https://housebrain.netlify.app/?jwtToken=${token}`
//     );
//   } else {
//     // If no session token, clear all cookies
//     console.log("No session token found, clearing all cookies...");

//     // Clear the cookies by setting them to expired in the response
//     res.clearCookie("authjs.csrf-token");
//     res.clearCookie("authjs.callback-url");
//     res.clearCookie("authjs.session-token");

//     // Optionally, send a response indicating the state
//     res.redirect(
//       DEV_MODE ? "http://localhost:5173" : "https://housebrain.netlify.app"
//     );
>>>>>>> 3994e1bfefeaf839d58cb5fde618bb61df1b1ec8
//   }
// });

export default router;
