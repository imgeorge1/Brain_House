import express from "express";
import ticket from "../controllers/ticketsController/ticketController.js";
import {
  users,
  updateUserPaidStatus,
} from "../controllers/showUsers/showUsers.js";
import signs from "../controllers/sign/signController.js";
import currentUser from "../controllers/currentUser/currentUserController.js";
import ticketTest from "../controllers/ticketsController/ticketTestController.js";
import usersInfo from "../controllers/authController/usersInfoController.js";

import allowedNextCategory from "../controllers/permission/permissionController.js";
import {
  postComments,
  getComments,
  deleteComment,
} from "../controllers/commentController/commentController.js";
import { authenticatedUser } from "../middleware/auth.middleware.js";
import signup from "../config/driveConfig/additionalinfo.js";
import { getSession } from "@auth/express";

const authRoutes = express.Router();
const DEV_MODE = process.env.NODE_ENV === "developer";

authRoutes.get("/beka", (req, res) => {
  res.send("Hello beka!");
});

authRoutes.get(
  "/user",
  async (req, res) => {
    try {
      // Explicitly log the cookie header
      const sessioncookie = req;
      console.log("SeSSIONNNNCOOKIEEEEEEE", sessioncookie);

      // Try getting the session from the cookie
      const session = await getSession(req, authConfig);

      // Debug log for session
      console.log("🔐 Authenticated Session:", session);

      if (session) {
        res.locals.session = session;
        return next();
      }

      res.status(401).json({ message: "Not Authenticated" });
    } catch (error) {
      console.error("❌ Error fetching session:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  currentUser
);
authRoutes.put("/user", allowedNextCategory);
authRoutes.get("/users", users);
authRoutes.put("/users/:userId", updateUserPaidStatus);
authRoutes.get("/usersInfo", usersInfo);

authRoutes.get("/tickets/:id", ticket);
authRoutes.post("/tickets", ticketTest);

authRoutes.post("/signup", signup);

// authRoutes.get("/api/video", generateVideos);

authRoutes.get("/signs/:id", signs);

authRoutes.post("/comments", postComments);
authRoutes.get("/comments", getComments);
authRoutes.delete("/comments/:id", deleteComment);

authRoutes.get("/logout", (req, res) => {
  // Get the auth instance to clear the session or token

  // Clear the auth token cookie (make sure the cookie name matches)
  res.clearCookie("authjs.csrf-token");
  res.clearCookie("authjs.callback-url");
  res.clearCookie("authjs.session-token");

  // Redirect to frontend (adjust URLs based on your environment)
  res.redirect(
    DEV_MODE ? "http://localhost:5173" : "https://housebrain.netlify.app"
  );
});

export default authRoutes;
