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
router.get("/", (req, res) => {
  const token = req.cookies["__Secure-authjs.session-token"];
  // console.log(req);
  if (token) {
    // If the session token exists, redirect to the frontend
    console.log("Session token found, redirecting to frontend...");
    res.redirect(
      DEV_MODE
        ? `http://localhost:5173/?jwtToken=${token}`
        : `https://housebrain.netlify.app/?jwtToken=${token}`
    );
  } else {
    // If no session token, clear all cookies
    console.log("No session token found, clearing all cookies...");

    // Clear the cookies by setting them to expired in the response
    // res.clearCookie("authjs.csrf-token");
    // res.clearCookie("authjs.callback-url");
    // res.clearCookie("authjs.session-token");

    // Optionally, send a response indicating the state
    res.redirect(
      DEV_MODE ? "http://localhost:5173" : "https://housebrain.netlify.app"
    );
  }
});

export default router;
