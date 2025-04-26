import dotenv from "dotenv/config";
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

const authRoutes = express.Router();
const DEV_MODE = process.env.NODE_ENV === "developer";

// authRoutes.get("/protected", async (req, res) => {
//   console.log(res.locals.session);
//   res.json(res.locals.session);
// });

// authRoutes.get("/api/protected", authenticatedUser, currentUser);

authRoutes.get("/beka", (req, res) => {
  res.send("Hello beka!");
});

authRoutes.get("/user", authenticatedUser, currentUser);
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
  const cookieOptions = {
    path: "/",
    sameSite: "None",
    secure: true, // make sure this matches how they were set
  };

  res.clearCookie("authjs.session-token", cookieOptions);
  res.clearCookie("authjs.callback-url", cookieOptions);
  res.clearCookie("authjs.csrf-token", cookieOptions);

  res.redirect(
    DEV_MODE ? "http://localhost:5173" : "https://brain-house-new.vercel.app"
  );
});

export default authRoutes;
