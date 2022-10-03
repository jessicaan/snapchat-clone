import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import { db, storage } from "./firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadString } from "firebase/storage";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = (e) => {
    e.preventDefault();
    const id = uuid();

    const storageRef = ref(storage, `posts/${id}`);
    const uploadTask = uploadString(storageRef, cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },

      db.collection("posts").add({
        id: id,
        username: user.username,
        photoUrl: user.photoUrl,
        description: "",
        message: input,
        photoCaptured: cameraImage,
        timestamp: serverTimestamp(),
        read: null,
      }),

      navigate("/Chats")
    );

    setInput("");
  };

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview__footer" onClick={sendPost}>
        <h2> Enviar Agora</h2>
        <SendIcon />
      </div>
    </div>
  );
}

export default Preview;
