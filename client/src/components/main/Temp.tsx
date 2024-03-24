import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"; // Replace with your server URL

const Temp = () => {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    // Function to fetch tokens from the server
    const fetchTokens = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/auth/tokens`);
        setTokens(response.data.tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  // Function to fetch video URL
  const fetchVideoUrl = async () => {
    try {
      const fileId =
        "https://drive.google.com/drive/folders/1Yha-KQqJRtyE4AhvpWyehx-YjGjzQgsz?usp=drive_link"; // Replace with the actual file ID
      const response = await axios.post(`${SERVER_URL}/api/video`, {
        tokens,
        fileId,
      });
      const videoUrl = response.data.videoUrl;
      console.log("Video URL:", videoUrl);
      // Now you can use the video URL as needed
    } catch (error) {
      console.error("Error fetching video URL:", error);
    }
  };

  // Function to initiate authentication process
  const redirectToAuthScreen = () => {
    window.location.href = `${SERVER_URL}/auth/url`;
  };

  return (
    <div>
      <button onClick={redirectToAuthScreen}>Fetch Video</button>
      {tokens && <button onClick={fetchVideoUrl}>Fetch Video URL</button>}
    </div>
  );
};

export default Temp;
