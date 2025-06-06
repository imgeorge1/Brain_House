import dotenv from "dotenv/config";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.DRIVE_CLIENT_ID,
  process.env.DRIVE_CLIENT_SECRET,
  process.env.DRIVE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });

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
