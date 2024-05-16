import React from "react";
import ReactPlayer from "react-player";

function VideoComponent() {
  return (
    <ReactPlayer
      controls={true}
      url="https://www.youtube.com/watch?v=vhUw7GkRHdk"
      height={712}
      width={892}
    />
  );
}

export default VideoComponent;
