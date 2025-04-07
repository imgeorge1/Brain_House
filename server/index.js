// import dotenv from "dotenv/config";
import express from "express";
import path from "path";
import generateSitemap from "./generateSitemap.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "cookie-session";

import CryptoJS from "crypto-js";
import mongoConnection from "./db/mongoConnection.js";
import router from "./routes/main.js";
import { fileURLToPath } from "url";

import {
  errorHandler,
  errorNotFoundHandler,
} from "./middleware/error.middleware.js";
import {
  authenticatedUser,
  currentSession,
} from "./middleware/auth.middleware.js";
import authConfig from "./src/config/auth.config.js";
import { ExpressAuth } from "@auth/express";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", true);

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
    credentials: true,
    origin: DEV_MODE
      ? "http://localhost:5173"
      : "https://housebrain.netlify.app",
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none", // REQUIRED for cross-site cookies
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    proxy: true,
  })
);

app.use(currentSession);
app.use("/auth", ExpressAuth(authConfig));

// app.get("/protected", async (req, res) => {
//   console.log(res.locals.session);
//   res.json(res.locals.session);
// });

// app.get("/api/protected", authenticatedUser, async (req, res) => {
//   res.json(res.locals.session);
// });

app.use("/", router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
