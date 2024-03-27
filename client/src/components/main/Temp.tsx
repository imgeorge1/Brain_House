import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"; // Replace with your server URL

const Temp = () => {
  const [videoLinks, setVideoLinks] = useState([]);

  // Function to fetch video links from the server
  const fetchVideoLinks = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/videos`);
      setVideoLinks(response.data.videoUrls);
      console.log("Video links", response.data.videoUrls);
    } catch (error) {
      console.error("Error fetching video links:", error);
    }
  };

  useEffect(() => {
    fetchVideoLinks();
  }, []);

  return (
    <div>
      {videoLinks.length > 0 ? (
        videoLinks.map((videoLink, index) => (
          <div key={index}>
            <iframe src={videoLink} width="640" height="480"></iframe>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Temp;
