import { google } from "googleapis";

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Automatically refresh the access token if it has expired
oauth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    // Store the new token for future use
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export default drive;
