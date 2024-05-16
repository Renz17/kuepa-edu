import React from "react";
import ChatComponent from "./ChatComponent";
import VideoComponent from "./VideoComponent";

function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100%_-_64px)] ">
      <div className="flex justify-center items-center w-full lg:w-[calc(100%_-_400px)] bg-[#ffedd5]">
        <VideoComponent />
      </div>
      <div className="w-full lg:w-[400px] bg-slate-300">
        <ChatComponent />
      </div>
    </div>
  );
}

export default HomePage;
