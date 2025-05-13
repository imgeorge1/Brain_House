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
import oldUser from "../controllers/oldUsers/oldUsers.js";

const authRoutes = express.Router();

authRoutes.get("/beka", (req, res) => {
  res.send("Hello beka!");
});

authRoutes.get("/user", authenticatedUser, currentUser);
authRoutes.put("/user", allowedNextCategory);
authRoutes.get("/users", users);
authRoutes.get("/oldusers", oldUser);
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
    httpOnly: true,
    path: "/",
    sameSite: "None",
    secure: true, // make sure this matches how they were set
  };

  // __Secure-
  // __Host-

  res.clearCookie("__Secure-authjs.session-token", cookieOptions);
  res.clearCookie("__Secure-authjs.callback-url", {
    path: "/",
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("__Host-authjs.csrf-token", cookieOptions);

  res.redirect(`${process.env.CLIENT_URL}`);
});

export default authRoutes;
