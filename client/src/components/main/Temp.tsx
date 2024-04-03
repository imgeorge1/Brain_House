import { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:3001";

const Temp = () => {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/video`);
        setVideoUrls(response.data.videoUrls);
      } catch (error) {
        console.error("Error fetching video URLs:", error);
      }
    };

    fetchVideoUrls();
  }, []);

  return (
    <div className="border border-red-400 flex flex-col justify-center items-center gap-7">
      <h2>Videos in the Folder:</h2>
      {videoUrls.map((url, index) => (
        <iframe
          key={index}
          title={`Video ${index + 1}`}
          src={url}
          width="50%"
          height="400px"
          style={{ marginBottom: "20px" }}
          sandbox="allow-same-origin allow-scripts"
        />
      ))}
    </div>
  );
};

export default Temp;
