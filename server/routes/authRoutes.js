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

const authRoutes = express.Router();

authRoutes.get("/user", currentUser);

authRoutes.get("/beka", (req, res) => {
  res.send("Hello beka!");
});

authRoutes.put("/user", allowedNextCategory);

authRoutes.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRoutes.get("/users", users);
authRoutes.put("/users/:userId", updateUserPaidStatus);

authRoutes.get("/tickets/:id", ticket);
authRoutes.post("/tickets", ticketTest);

// authRoutes.get("/api/video", generateVideos);

authRoutes.get("/signs/:id", signs);

authRoutes.get("/usersInfo", usersInfo);

authRoutes.post("/comments", postComments);

authRoutes.get("/comments", getComments);

authRoutes.delete("/comments/:id", deleteComment);

export default authRoutes;
