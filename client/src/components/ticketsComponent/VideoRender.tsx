import { useState } from "react";
import { Category } from "../../types/Types";
import Comments from "../comments/Comments";
import star from "../../assets/star.png";

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
        <div className="flex justify-between pt-2 mx-2">
          <p className="flex justify-center items-center">
            <img
              src={star}
              alt="star"
              className="w-[14px] h-[14px] mb-1 mr-1"
            />{" "}
            <span>5.0</span>
          </p>
          <button
            onClick={() => setHide(!hide)}
            className="border border-[#663aac] text-[#663aac] rounded-3xl px-2 hover:border-[#230751]
            hover:text-[#230751] duration-200 focus:border-[#230751] focus:text-[#230751]"
          >
            კომენტარები
          </button>
        </div>
        {hide && <Comments />}
      </div>
    );
  }
};

export default VideoRender;
