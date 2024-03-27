require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const mongoConnection = require("./db/mongoConnection");
const router = require("./routes/main");

const app = express();

// Generate secret key for session
const generateSecretKey = () => {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
};

const secretKey = generateSecretKey();

const DEV_MODE = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: DEV_MODE
      ? "http://localhost:5173"
      : "https://brain-house.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoConnection();

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      secure: true, // Set to true for HTTPS environments
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
    proxy: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "945913383511-forclflr8ehf5868ij9hvi1n226ripkl.apps.googleusercontent.com",
  "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",
  "http://localhost:3001/auth/google/callback"
);

// app.get("/auth/tokens", (req, res) => {
//   const tokens =
//     "ya29.a0Ad52N38B-Tnyq4aTT-FklL9CC1jfiShOlMSEy2UwXWXBbDQo1rMOQnm8F-fwoYGtqdru1dMpbdupoJvRKgpOCq4vxLjJ2ZU1lJE26gD3dgdmzvL2AZFMRQPAdWsLQ9wTPvOpi93NAMeEq1nkZjpgI6v3pIC2HV-pgLP9aCgYKAScSARESFQHGX2MiVbar6uamzErtprFkvkaZSA0171";
//   res.json({ tokens });
// });

// app.get("/auth/url", (req, res) => {
//   const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/drive.readonly"],
//   });
//   res.json({ authUrl });
// });

app.get("/auth/google/callback", async (req, res) => {
  console.log("Request Query:", req.query);
  const { code } = req.query;
  try {
    const { tokens } = oauth2Client.getToken(code);
    req.session.tokens = tokens; // Store tokens in session
    res.redirect("/"); // Redirect user to homepage
  } catch (error) {
    console.error("Error exchanging authorization code for tokens:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const drive = google.drive({
  version: "v3",
  auth: "AIzaSyBEvIxUMb8JXTCJM9OLhR45ECZ_62STPvc",
});

app.get("/api/video", async (req, res) => {
  try {
    fileId = "11zT9wAOgBDCyMtLOQGW9exrfug0GLMTS";

    console.log("TOK", req.session.token);
    // Retrieve file metadata
    const response = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink",
    });

    // Extract and send video URL
    const videoUrl = response.data.webViewLink.replace("/view", "/preview");
    res.json({ videoUrl });
  } catch (error) {
    console.error("Error fetching video URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
