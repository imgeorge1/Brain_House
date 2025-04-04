import { getSession } from "@auth/express";
import authConfig from "../src/config/auth.config.js";

export async function authenticatedUser(req, res, next) {
  try {
    const session =
      res.locals.session ?? (await getSession(req, authConfig)) ?? undefined;

    res.locals.session = session;

    if (session) {
      return next();
    }

    res.status(401).json({ message: "Not Authenticated" });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function currentSession(req, res, next) {
  const session = (await getSession(req, authConfig)) ?? undefined;
  res.locals.session = session;
  return next();
}
