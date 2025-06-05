import { VideoContainer} from "./styles"
import "plyr/dist/plyr.css";
import React, {useEffect, useRef} from "react";
import Plyr from "plyr";
import { HorizontalLine } from "../ScrollLine/styles";

const Video = () => {
  const videoRef = useRef(null);
  const horizontalLineRef = useRef(null);


  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
      });

      // Limpando instância quando o componente desmonta
      return () => {
        player.destroy();
      };
    }
  }, []);


  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const triggerPoint = 200;
    const progress = Math.min((scrollTop - triggerPoint) / 900, 1);

    if (horizontalLineRef.current) {
      horizontalLineRef.current.style.transform = `scaleX(${progress})`;
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
    <VideoContainer>
      <video ref={videoRef} className="plyr" playsInline controls>
        <source src="public/demo.mp4" type="video/mp4" />
      </video>
    </VideoContainer>
      <HorizontalLine ref={horizontalLineRef}/> 
    </>
  );
};

export default Video;


