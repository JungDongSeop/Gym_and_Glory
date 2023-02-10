import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const SideWebcam = () => {
  const [isShowVideo, setIsShowVideo] = useState(true);
  const videoElement = useRef(null);

  const videoConstraints = {
    width: 280,
    height: 210,
    facingMode: "user",
  };

  const startCam = () => {
    setIsShowVideo(true);
  };

  const stopCam = () => {
    let stream = videoElement.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsShowVideo(false);
  };

  return (
    <div style={{width: '280px', height: '260px'}}>
      <div className="camView" style={{margin: 'auto', width:'280px' ,height: '210px', backgroundColor: 'gray'}}>
        {isShowVideo && (
          <Webcam
            audio={false}
            ref={videoElement}
            videoConstraints={videoConstraints}
          />
        )}
      </div>
      <div style={{margin: '0 auto', padding: 'auto'}}>
        <button onClick={startCam}>Start Video</button>
        <button onClick={stopCam}>Stop Video</button>
      </div>
    </div>
  );
};

export default SideWebcam;
