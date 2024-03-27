import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"; // Replace with your server URL

const Temp = () => {
  const [tokens, setTokens] = useState(null);
  const [video, setVideo] = useState();

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
    const fetchVideoUrl = async () => {
      try {
        // const fileId =
        //   "https://drive.google.com/drive/folders/1Yha-KQqJRtyE4AhvpWyehx-YjGjzQgsz?usp=drive_link"; // Replace with the actual file ID
        const response = await axios.get(`${SERVER_URL}/api/video`);
        const videoUrl = response.data.videoUrl;
        // console.log("Video URL:", videoUrl);
        setVideo(videoUrl);
        // Now you can use the video URL as needed
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoUrl();

    // fetchTokens();
  }, []);

  // Function to fetch video URL

  useEffect(() => {
    fetchVideoLinks();
  }, []);

  console.log(video);

  return (
    <div>
      {/* <button onClick={redirectToAuthScreen}>Fetch Video</button>
      <button onClick={fetchVideoUrl}>Fetch Video URL</button> */}
      <iframe src={video} width="640" height="480" allow="autoplay"></iframe>
    </div>
  );
};

export default Temp;
