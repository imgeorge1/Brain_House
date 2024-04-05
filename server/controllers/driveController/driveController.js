// This file contains route handlers for Google Drive API endpoints
const drive = require("../../config/driveConfig/driveConfig");

const generatePublicUrl = async () => {
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
};

const generateVideos = async (req, res) => {
  try {
    // Call the function to generate the public URL
    const publicUrls = await generatePublicUrl();
    res.json({ videoUrls: publicUrls });
  } catch (error) {
    console.error("Error generating public URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = generateVideos;
