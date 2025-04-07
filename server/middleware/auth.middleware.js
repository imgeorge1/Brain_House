import { getSession } from "@auth/express";
import authConfig from "../src/config/auth.config.js";

export async function authenticatedUser(req, res, next) {
  try {
    // Explicitly log the cookie header
    const sessioncookie = req.cookies["__Secure-authjs.session-token"];
    console.log("SeSSIONNNNCOOKIEEEEEEE", sessioncookie);

    // Try getting the session from the cookie
    const session = await getSession(req, authConfig);

    // Debug log for session
    console.log("🔐 Authenticated Session:", session);

    if (session) {
      res.locals.session = session;
      return next();
    }

    res.status(401).json({ message: "Not Authenticated" });
  } catch (error) {
    console.error("❌ Error fetching session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function currentSession(req, res, next) {
  try {
    const session = await getSession(req, authConfig);

    console.log("[req.session]", session);
    res.locals.session = session;
    return next();
  } catch (error) {
    console.error("❌ Error getting current session:", error);
    res.locals.session = null;
    return next();
  }
}
