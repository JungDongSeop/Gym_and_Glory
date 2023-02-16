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
    <div style={{ marginTop:'-5px', width: '280px', height: '230px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className="camView" style={{marginTop:'-40px',  width:'280px' ,height: '180px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {on ? (
          <div className={classes.webonDiv}>
          <Webcam
            audio={false}
            ref={videoElement}
            videoConstraints={videoConstraints}
          />
          <button className={classes.vbutton} onClick={() => dispatch(toggleCamera())}>웹캠 끄기</button>
          </div>
        ) : (
          <button className={classes.vbutton} onClick={() => dispatch(toggleCamera())}>웹캠 켜기</button>
        )}
      </div>
    </div>
  );
};

export default SideWebcam;
