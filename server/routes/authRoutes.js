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
import signup from "../controllers/authController/signup.js";
import oldUser from "../controllers/oldUsers/oldUsers.js";
import editUser from "../controllers/usercontroller/edituser.js";
import login from "../controllers/authController/login.js";
import confrim from "../controllers/authController/confrimcode.js";
import { authenticate } from "../middleware/auth.js";
import verify from "../controllers/authController/verify.js";
import newpassword from "../controllers/authController/newpassword.js";
import verifysignup from "../controllers/authController/verifysignup.js";
import addUserCity from "../controllers/usercontroller/addcityuser.js";
import practice from "../controllers/practicecontroller/practice.js";
import fetchPractice from "../controllers/practicecontroller/fetchpractice.js";
import editPractice from "../controllers/practicecontroller/editpractice.js";
import deletePractice from "../controllers/practicecontroller/deletepracticestreet.js";
import sendCode from "../controllers/usercontroller/sendcode.js";

const authRoutes = express.Router();

authRoutes.get("/beka", (req, res) => {
  res.send("Hello beka!");
});

authRoutes.get("/user", authenticate, currentUser);
authRoutes.put("/user", allowedNextCategory);
authRoutes.get("/users", users);
authRoutes.get("/oldusers", oldUser);
authRoutes.put("/users/:userId", updateUserPaidStatus);
authRoutes.get("/usersInfo", usersInfo);

authRoutes.get("/tickets/:id", ticket);
authRoutes.post("/tickets", ticketTest);

authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.post("/verify", verify);
authRoutes.post("/confirm", confrim);
authRoutes.post("/newpassword", newpassword);
authRoutes.post("/verifysignup", verifysignup);

authRoutes.put("/edituser", editUser);
authRoutes.put("/add_city", addUserCity);

authRoutes.post("/practice", practice);
authRoutes.get("/practice_get", fetchPractice);
authRoutes.put("/practice/:id", editPractice);
authRoutes.delete("/practice/:id", deletePractice);

authRoutes.post("/send_code", sendCode);

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

  res.clearCookie("refreshToken", cookieOptions);

  res.redirect(`${process.env.CLIENT_URL}`);
});

export default authRoutes;
