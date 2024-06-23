import { useState } from "react";
import { Category } from "../../types/Types";
import Comments from "../comments/Comments";

const VideoRender = ({
  checkForVideo,
}: {
  checkForVideo: Category | null | undefined;
}) => {
  const [hide, setHide] = useState(false);

  if (!checkForVideo || !checkForVideo.videoUrl) return null;

  const videoUrls = checkForVideo.videoUrl.split(" ");

  const isThirtyPath = location.pathname.split("/")[2] === "30";

  if (isThirtyPath) {
    return videoUrls.map((url, index) => (
      <iframe
        className="w-full h-[280px] md:h-[460px]"
        key={`video-${checkForVideo.id}-${index}`} // Unique key for each iframe
        title={`Video ${checkForVideo.id}-${index}`}
        src={url}
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
      />
    ));
  } else {
    return (
      <div>
        <iframe
          className="w-full h-[280px] md:h-[460px]"
          key={`video-${checkForVideo.id}`} // Unique key for each iframe
          title={`Video ${checkForVideo.id}`}
          src={videoUrls[0]}
          sandbox="allow-same-origin allow-scripts"
          allowFullScreen
        />
        <div className="flex justify-between pt-2">
          <p>შეფასება 5.0</p>
          <button onClick={() => setHide(!hide)}>კომენტარები</button>
        </div>
        {hide && <Comments />}
      </div>
    );
  }
};

export default VideoRender;
