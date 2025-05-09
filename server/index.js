import dotenv from "dotenv/config";
import express from "express";
import path from "path";
import generateSitemap from "./generateSitemap.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import mongoConnection from "./db/mongoConnection.js";
import router from "./routes/main.js";
import { fileURLToPath } from "url";

import {
  errorHandler,
  errorNotFoundHandler,
} from "./middleware/error.middleware.js";
import { currentSession } from "./middleware/auth.middleware.js";
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

// Connect to MongoDB
mongoConnection();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://drive.google.com"],
    credentials: true,
  })
);

app.use(currentSession);
app.use("/auth", ExpressAuth(authConfig));

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
