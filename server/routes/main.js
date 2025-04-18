import dotenv from "dotenv/config";
import express from "express";
import authRoutes from "./authRoutes.js";
import { authenticatedUser } from "../middleware/auth.middleware.js";

const DEV_MODE = process.env.NODE_ENV === "developer";

const router = express.Router();

router.use("/", authRoutes);

router.get("/", (req, res) => {
  const token = req.cookies["authjs.session-token"];
  if (token) {
    console.log("Session token found, redirecting to frontend...");
    res.send("hellooo");
  } else {
    console.log("No session token found, clearing all cookies...");
  }
});

export default router;
