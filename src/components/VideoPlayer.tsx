import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="w-full h-[400px] bg-black rounded-lg overflow-hidden">
      <video
        controls
        className="w-full h-full"
        src={videoUrl}
        style={{ objectFit: "cover" }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
