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
    origin: ["http://localhost:5173", "https://drive.google.com"],

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

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

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

// Inside generatePublicUrl function

// Inside generatePublicUrl function

// Inside generatePublicUrl function

async function generatePublicUrl() {
  try {
    const folderId = "1Yha-KQqJRtyE4AhvpWyehx-YjGjzQgsz"; // Replace with your folder ID
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name, webViewLink)", // Retrieve only necessary fields
    });

    const files = response.data.files;
    const publicUrls = files.map((file) => {
      const fileId = file.id;
      return `https://drive.google.com/file/d/${fileId}/preview`;
    });

    return publicUrls;
  } catch (error) {
    console.log("Error generating public URLs:", error);
    throw error;
  }
}

app.get("/api/video", async (req, res) => {
  try {
    // Call the function to generate the public URL
    const publicUrls = await generatePublicUrl();
    console.log("publicUrls", publicUrls);
    res.json({ videoUrls: publicUrls });
  } catch (error) {
    console.error("Error generating public URLs:", error);
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
