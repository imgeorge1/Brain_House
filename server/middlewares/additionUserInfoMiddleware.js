const AdditionUserInfo = require("../models/AdditionUserInfoSchema");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const additionUserInfoMiddleware = async (req, res, next) => {
  try {
    const { firstName, lastName, email, completed, isPaid } = req.user;
    console.log("Signed in user", { email, completed, isPaid });
    // Create JWT token with user information
    const jwtToken = jwt.sign(
      { firstName, lastName, email, completed, isPaid },
      jwtSecret,
      {
        expiresIn: "4h",
      }
    );

    const additionUserInfo = await AdditionUserInfo.findOne({
      email: req.user.email,
    });

    if (!additionUserInfo) {
      res.redirect(`${process.env.CLIENT_URL}/register/?jwtToken=${jwtToken}`);
    } else {
      // Redirect user to client URL with JWT token as parameter
      res.redirect(`${process.env.CLIENT_URL}/?jwtToken=${jwtToken}`);
    }

    // Call next to pass control to the next middleware
    next();
  } catch (error) {
    // Handle errors
    next(error);
  }
};

module.exports = additionUserInfoMiddleware;
