const express = require("express");
const signup = require("../controllers/authController");
const { lessons, lessonsGET } = require("../controllers/lessonController");
const ticket = require("../controllers/ticketController");

const jwt = require("jsonwebtoken");
// const User = require('../models/userSchema'); // Adjust the path as per your project structure
// const {
//   auth,
//   callbackAuth,
//   fbCallbackAuth,
//   fbAuth,
//   redirect,
// } = require('../config/auth/passportAuth');
// const { login, logout } = require('../config/loginLogout/loginLogout');
const {
  users,
  getUserById,
  updateUserPaidStatus,
} = require("../controllers/showUsers");
const googleStrategy = require("../config/passport/google");
const facebookStrategy = require("../config/passport/facebook");
const { google } = require("googleapis");

const allowedNextCategory = require("../controllers/permissionController");
const User = require("../models/userSchema");
const Ticket = require("../models/ticketSchema");

const authRoutes = express.Router();

const jwtSecret = process.env.JWT_SECRET;
// Passport JS
// auth with google

authRoutes.get(
  "/auth/google",
  googleStrategy.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
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
  async (req, res) => {
    try {
      const { firstName, lastName, email, completed, isPaid } = req.user;
      console.log("req.userr", req.user);
      // Create JWT token with user information
      const jwtToken = jwt.sign(
        { firstName, lastName, email, completed, isPaid },
        jwtSecret,
        {
          expiresIn: "4h",
        }
      );

      // Redirect user to client URL with JWT token as parameter
      res.redirect(`${process.env.CLIENT_URL}/?jwtToken=${jwtToken}`);
    } catch (error) {
      console.log("Logging in error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// auth with facebook

authRoutes.get(
  "/auth/facebook/callback",
  facebookStrategy.authenticate("facebook", {
    // successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  async (req, res) => {
    try {
      const { firstName, lastName, email, provider, completed, isPaid } =
        req.user;
      console.log("req. facebook userr", req.user);

      // Create JWT token with user information
      const jwtToken = jwt.sign(
        { firstName, lastName, email, provider, completed, isPaid },
        jwtSecret,
        {
          expiresIn: "4h",
        }
      );

      // Redirect user to client URL with JWT token as parameter
      res.redirect(`${process.env.CLIENT_URL}/?jwtToken=${jwtToken}`);
    } catch (error) {
      console.log("Logging in error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to request object for further use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

authRoutes.get("/user", authenticateUser, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const { firstName, lastName, email, completed, isPaid } = user;
  console.log("USER:", user);
  res.json({ firstName, lastName, email, completed, isPaid });
});

authRoutes.put("/user", authenticateUser, allowedNextCategory);

// Endpoint to check if user is logged in

// authRoutes.get("/login/success", (req, res) => {
//   if (req.user) {
//     console.log("successUser", req.user);
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

authRoutes.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

////////////End Passport JS

authRoutes.post("/signup", signup);

authRoutes.post("/lessons", lessons);
authRoutes.get("/lessonsAll", lessonsGET);

authRoutes.get("/users", users);
authRoutes.get("/users/:userId", getUserById);
authRoutes.put("/users/:userId", updateUserPaidStatus);

authRoutes.get("/tickets/:id", ticket);
authRoutes.post("/tickets", async (req, res) => {
  try {
    const selectedIds = req.body.data;
    const tickets = await Ticket.aggregate([
      { $match: { categoryID: { $in: selectedIds } } }, // Match documents based on the array of IDs
      { $sample: { size: 30 } }, // Randomly select documents
    ]);
    res.status(200).send(tickets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = authRoutes;
