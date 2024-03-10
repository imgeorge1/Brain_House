require("dotenv").config();
const DEV_MODE = process.env.NODE_ENV === "production";

const login = async (req, res) => {
  try {
    console.log("req   user", req.user);
    if (req.user) {
      // If user is authenticated, send the serialized user data
      res.status(200).json({ message: "user Login", user: req.user });
    } else {
      // If user is not authenticated, send an error message
      res.status(400).json({ message: "Not Authorized" });
    }
  } catch (error) {
    // Handle any errors that might occur
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect(
      DEV_MODE ? "https://brain-house.vercel.app/" : "http://localhost:3001/"
    );
  });
};

module.exports = { login, logout };
