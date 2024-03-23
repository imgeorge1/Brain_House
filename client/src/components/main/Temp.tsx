import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001"; // Replace with your server URL

const Temp = () => {
  const [webViewLink, setWebViewLink] = useState(null);

  // Function to fetch the webViewLink from the server
  const fetchWebViewLink = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/public-url`);
      setWebViewLink(response.data.webViewLink);
      console.log("webViewLink", response.data.webViewLink);
    } catch (error) {
      console.error("Error fetching webViewLink:", error);
    }
  };
  // https://drive.google.com/file/d/1JvCvWK8g68KGrEzYJiHhmVBRodWnu9IX/view?usp=drive_link

  useEffect(() => {
    fetchWebViewLink();
  }, []);

  return (
    <div>
      {webViewLink ? (
        <a href={webViewLink} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Temp;
