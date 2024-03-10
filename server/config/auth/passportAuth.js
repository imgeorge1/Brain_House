require("dotenv").config();
const passport = require("../../config/passport");
const AdditionUserInfo = require("../../models/AdditionUserInfoSchema");

// Middleware to authenticate using Google OAuth with specified scope
const auth = passport.authenticate("google", { scope: ["email", "profile"] });

const DEV_MODE = process.env.NODE_ENV === "production";

// Middleware to handle callback from Google OAuth authentication
const callbackAuth = passport.authenticate("google", {
  failureRedirect: DEV_MODE
    ? "https://brain-house.vercel.app"
    : "http://localhost:5173", // Redirect to home if authentication fails
});

const fbAuth = passport.authenticate("facebook", { scope: ["email"] });
const fbCallbackAuth = passport.authenticate("facebook", {
  failureRedirect: DEV_MODE
    ? "https://brain-house.vercel.app"
    : "http://localhost:5173", // Redirect to home if authentication fails
});

// Redirect middleware after successful authentication
const redirect = async (req, res) => {
  const userInfo = await AdditionUserInfo.find({
    userId: req.user._id,
  });
  // Here, you can check if the user is registered or not
  if (userInfo.length > 0) {
    // User is registered, redirect to a route of your choice
    res.redirect(
      DEV_MODE ? "https://brain-house.vercel.app" : "http://localhost:5173"
    );
  } else {
    // User is not registered, redirect to the registration route
    res.redirect(
      DEV_MODE
        ? "https://brain-house.vercel.app/register"
        : "http://localhost:5173/register"
    );
  }
};

module.exports = { auth, callbackAuth, fbAuth, fbCallbackAuth, redirect };
