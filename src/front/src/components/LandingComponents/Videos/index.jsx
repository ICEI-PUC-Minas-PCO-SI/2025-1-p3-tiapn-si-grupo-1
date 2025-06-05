import { VideoContainer} from "./styles"
import "plyr/dist/plyr.css";
import React, {useEffect, useRef} from "react";
import Plyr from "plyr";

const Video = () => {
  const videoRef = useRef(null);

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

  return (
    <VideoContainer>
      <video ref={videoRef} className="plyr" playsInline controls>
        <source src="public/demo.mp4" type="video/mp4" />
      </video>
    </VideoContainer>
  );
};

export default Video;


