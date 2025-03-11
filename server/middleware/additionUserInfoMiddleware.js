import AdditionUserInfo from "../models/AdditionUserInfoSchema.js";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const DEV_MODE = process.env.NODE_ENV === "developer";

const additionUserInfoMiddleware = async (req, res, next) => {
  try {
    const { fullName, firstName, lastName, email, completed, isPaid } =
      req.user;
    console.log("Signed in user", { fullName, email, completed, isPaid });
    // Create JWT token with user information
    const jwtToken = jwt.sign(
      { fullName, firstName, lastName, email, completed, isPaid },
      jwtSecret,
      {
        expiresIn: "4h",
      }
    );

    const additionUserInfo = await AdditionUserInfo.findOne({
      email: req.user.email,
    });

    if (!additionUserInfo) {
      res.redirect(
        `${
          DEV_MODE ? "http://localhost:5173" : process.env.CLIENT_URL
        }/register/?jwtToken=${jwtToken}`
      );
    } else {
      // Redirect user to client URL with JWT token as parameter
      res.redirect(
        `${
          DEV_MODE ? "http://localhost:5173" : process.env.CLIENT_URL
        }/?jwtToken=${jwtToken}`
      );
    }

    // Call next to pass control to the next middleware
    next();
  } catch (error) {
    // Handle errors
    next(error);
  }
};

export default additionUserInfoMiddleware;
