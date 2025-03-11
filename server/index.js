import dotenv from "dotenv/config";
import express from "express";
import path from "path";
import generateSitemap from "./generateSitemap.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "cookie-session";
// import MongoStore from 'connect-mongo';
import CryptoJS from "crypto-js";
import mongoConnection from "./db/mongoConnection.js";
import router from "./routes/main.js";
import { fileURLToPath } from "url";
import { ExpressAuth } from "@auth/express";
import {
  authenticatedUser,
  currentSession,
} from "./middleware/auth.middleware.js";
import {
  errorHandler,
  errorNotFoundHandler,
} from "./middleware/error.middleware.js";
import authConfig from "./src/config/auth.config.js";
import currentUser from "./controllers/currentUser/currentUserController.js";

const app = express();

// Serve robots.txt
app.use("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "robots.txt"));
});

// Serve sitemap.xml
app.get("/sitemap.xml", async (req, res) => {
  try {
    const sitemap = await generateSitemap();
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
});

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "client/build")));

// Generate secret key for session
const generateSecretKey = () => {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
};

const secretKey = generateSecretKey();

// Connect to MongoDB
mongoConnection();

const DEV_MODE = process.env.NODE_ENV === "developer";

app.use(
  cors({
    origin: DEV_MODE
      ? ["http://localhost:5173", "https://drive.google.com"]
      : ["https://www.brainhouse.ge", "https://drive.google.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      secure: false, // Set to true for HTTPS environments
    },
    proxy: true,
  })
);
app.set("trust proxy", true);

app.use(currentSession);

// Set up ExpressAuth to handle authentication
// IMPORTANT: It is highly encouraged set up rate limiting on this route
app.use("/api/auth/*", ExpressAuth(authConfig));
app.get("/api/auth/callback/google");

app.get("/logout", (req, res) => {
  // Get the auth instance to clear the session or token

  // Clear the auth token cookie (make sure the cookie name matches)
  res.clearCookie("authjs.callback-url", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.clearCookie("authjs.csrf-token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.clearCookie("authjs.session-token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  // Redirect to frontend (adjust URLs based on your environment)
  res.redirect(DEV_MODE ? "http://localhost:5173" : process.env.CLIENT_URL);
});

app.get("/", async (req, res) => {
  console.log("from main route");

  try {
    // Extract the token from cookies (if using cookie-based auth)
    const token = req.cookies["authjs.session-token"];
    const session = res.locals.session;
    console.log("current session ........", session.user.email);
    if (!token) {
      return res.redirect("http://localhost:5173/");
    }

    // console.log("Auth token:", token);

    // Redirect to frontend with token as a query parameter
    res.redirect(`http://localhost:5173/?jwtToken=${token}`);
  } catch (error) {
    console.error("Error retrieving token:", error);
    res.redirect("http://localhost:5173/login?error=auth_failed");
  }
});
app.get("/user", currentUser);
// Error handlers
app.use(errorNotFoundHandler);
app.use(errorHandler);

app.use("/", router);

const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
