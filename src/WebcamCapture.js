import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router-dom";
import "./styles/WebcamCapture.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    dispatch(setCameraImage(imageSrc));
    navigate("/Preview");
  }, [dispatch, navigate]);

  const exit = () => {
    navigate("/Chats");
  };

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <CloseRoundedIcon className="webcamCapture__close" onClick={exit} />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
      />
    </div>
  );
}

export default WebcamCapture;
