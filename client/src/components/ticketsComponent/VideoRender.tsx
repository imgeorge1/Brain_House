import { Category } from "../../types/Types";

const VideoRender = ({
  checkForVideo,
}: {
  checkForVideo: Category | null | undefined;
}) => {
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
      <iframe
        className="w-full h-[280px] md:h-[460px]"
        key={`video-${checkForVideo.id}`} // Unique key for each iframe
        title={`Video ${checkForVideo.id}`}
        src={videoUrls[0]}
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
      />
    );
  }
};

export default VideoRender;
