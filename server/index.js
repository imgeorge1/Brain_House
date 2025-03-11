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
app.get("/api/auth/callback/google", async (req, res) => {
  // Get user session details
  console.log("Hiiit");

  const user = res.locals.session?.user;

  if (!user) {
    console.log("FAILEEEEEDD");

    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log("from callabck", user);

  //  Better: Store user in a session/cookie & redirect
  res.cookie("token", user.token, {
    httpOnly: false,
    secure: false, // Set to true in production (HTTPS)
    sameSite: "None", // For cross-domain cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, // Optional: Cookie expiration
  });
  // return res.redirect("http://localhost:5173");
});

app.get("/", async (_req, res) => {
  console.log("from main route");

  // res.json({
  //   title: "Express Auth Example",
  //   user: res.locals.session?.user || null,
  // });
  res.redirect("http://localhost:5173");
});

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
