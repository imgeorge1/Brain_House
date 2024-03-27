require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const mongoConnection = require("./db/mongoConnection");
const router = require("./routes/main");
const fs = require("fs");
const path = require("path");

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

const clientId = process.env.DRIVE_CLIENT_ID;
const clientSecret = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const refreshToken = process.env.DRIVE_REFRESH_TOKEN;

// const access_token ="ya29.a0Ad52N39yry_HwZXTWsWC6ckyRjBJIHmPjs7REpAapCmCEimm3O5kSGet2kk8Xg1sJtLDLRVddxPcHaeBdGvUlMjIUCoUFulORQxdXFWQwTMPNKpXVZwWCW1H4Qr8M-YboFBCHHfbAYRoCsiferj3UxK-Ypuay4JDid4aaCgYKAcUSARESFQHGX2MiIykWXW4grvt9fBY6Uq5yQA0171"

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  refreshToken
);

oauth2Client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "video1.mp4");

// Function to get video URLs from a specific folder
const getVideoUrlsFromFolder = async (folderId) => {
  try {
    // List files in the folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType='video/mp4'`,
      fields: "files(id, webViewLink)",
    });

    // Extract video URLs
    const videoUrls = response.data.files.map((file) => file.webViewLink);

    return videoUrls;
  } catch (error) {
    console.error("Error fetching video URLs:", error);
    throw error;
  }
};

// Generate Public URL

app.get("/api/videos", async (req, res) => {
  try {
    const folderId = "1Yha-KQqJRtyE4AhvpWyehx-YjGjzQgsz"; // Replace with your folder ID
    const videoUrls = await getVideoUrlsFromFolder(folderId);
    console.log("Video URLs:", videoUrls);
    res.json({ videoUrls });
  } catch (error) {
    console.error("Error fetching video URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// https://drive.google.com/file/d/1pB7x-Qf82F8kym8w6wu1PVHOHiIrIoOn/view?usp=drive_link

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

// app.get("/auth/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const { tokens } = oauth2Client.getToken(code);
//     res.json({ tokens });
//   } catch (error) {
//     console.error("Error exchanging authorization code for tokens:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/api/video", async (req, res) => {
//   try {
//     const { tokens, fileId } = req.body;

//     // Set credentials on OAuth2 client
//     oauth2Client.setCredentials(tokens);

//     // Create drive instance with authenticated client
//     const drive = google.drive({ version: "v3", auth: oauth2Client });

//     // Retrieve file metadata
//     const response = await drive.files.get({
//       fileId: fileId,
//       fields: "webViewLink",
//     });

//     // Extract and send video URL
//     const videoUrl = response.data.webViewLink.replace("/view", "/preview");
//     res.json({ videoUrl });
//   } catch (error) {
//     console.error("Error fetching video URL:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

const PORT = process.env.PORT || 3001;

app
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
