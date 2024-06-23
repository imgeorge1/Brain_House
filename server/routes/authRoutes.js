const express = require("express");
const signup = require("../controllers/authController/authController");
const ticket = require("../controllers/ticketsController/ticketController");
const {
  users,
  updateUserPaidStatus,
} = require("../controllers/showUsers/showUsers");
const googleStrategy = require("../config/passport/google");
const facebookStrategy = require("../config/passport/facebook");
const signs = require("../controllers/sign/signController");
const additionUserInfoMiddleware = require("../middlewares/additionUserInfoMiddleware");
// const generateVideos = require("../controllers/driveController/driveController");
const authenticateUser = require("../middlewares/authenticateUser");
const currentUser = require("../controllers/currentUser/currentUserController");
const ticketTest = require("../controllers/ticketsController/ticketTestController");
const usersInfo = require("../controllers/authController/usersInfoController");

const allowedNextCategory = require("../controllers/permission/permissionController");
const {
  postComments,
  getComments,
  deleteComment,
} = require("../controllers/commentController/commentController");

const authRoutes = express.Router();

const DEV_MODE = process.env.NODE_ENV === "developer";

authRoutes.get(
  "/auth/google",
  googleStrategy.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/auth/facebook",
  facebookStrategy.authenticate("facebook", { scope: "email" })
);

authRoutes.get(
  "/auth/google/callback",
  googleStrategy.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  additionUserInfoMiddleware
);

authRoutes.get(
  "/auth/facebook/callback",
  facebookStrategy.authenticate("facebook", {
    failureRedirect: "/login/failed",
  }),
  additionUserInfoMiddleware
);

authRoutes.get("/user", authenticateUser, currentUser);

authRoutes.put("/user", allowedNextCategory);

authRoutes.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect(DEV_MODE ? "http://localhost:5173" : process.env.CLIENT_URL);
});

authRoutes.post("/signup", signup);

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

module.exports = authRoutes;
