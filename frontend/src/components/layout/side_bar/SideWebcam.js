import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCamera } from "../../../redux/cameraSlice";
import Webcam from "react-webcam";
import classes from "./SideWebcam.module.scss";

const SideWebcam = () => {
  // redux로 카메라 켤지 말지 받아오기 (on이 true면 켜기)
  const on = useSelector(state => state.camera.on);
  const dispatch = useDispatch()

  const videoElement = useRef(null);

  const videoConstraints = {
    width: 280,
    height: 210,
    facingMode: "user",
  };

  return (
    <div style={{ marginTop:'-20px', width: '280px', height: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className="camView" style={{margin: 'auto', width:'280px' ,height: '210px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {on ? (
          <Webcam
            audio={false}
            ref={videoElement}
            videoConstraints={videoConstraints}
          />
        ) : (
          <button onClick={() => dispatch(toggleCamera())} style={{ margin: 'auto'}}>웹캠 확인</button>
        )}
      </div>
      {/* <div style={{margin: '0 auto'}}> */}
      <button className={classes.vbutton} onClick={() => dispatch(toggleCamera())}>Start Video</button>
      {/* </div> */}
    </div>
  );
};

export default SideWebcam;
