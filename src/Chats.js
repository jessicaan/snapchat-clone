import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./styles/Chats.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   Pegar os posts do Firebase
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  //   Função para acessar a camera

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          className="chats__avatar"
          src={user.photoUrl}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Amigos" />
        </div>
        <ChatBubbleIcon className="chat__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: {
              username,
              photoUrl,
              description,
              message,
              photoCaptured,
              timestamp,
              read,
            },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              message={message}
              photoUrl={photoUrl}
              photoCaptured={photoCaptured}
              read={read}
            />
          )
        )}
      </div>

      <RadioButtonUnchecked className="chats__takePicIcon" onClick={takeSnap} />
    </div>
  );
}

export default Chats;
