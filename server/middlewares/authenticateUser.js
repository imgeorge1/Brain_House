const jwt = require("jsonwebtoken");

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

module.exports = authenticateUser;
