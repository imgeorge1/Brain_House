require("dotenv").config();
const express = require("express");
const path = require("path");
const generateSitemap = require("./generateSitemap");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
// const MongoStore = require("connect-mongo");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const mongoConnection = require("./db/mongoConnection");
const router = require("./routes/main");

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
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGODB_URL,
    // }),
    proxy: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
