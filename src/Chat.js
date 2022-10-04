import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles/Chat.css";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import ReactTimeago from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import portugueseStrings from "react-timeago/lib/language-strings/pt-br";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

function Chat({
  read,
  id,
  username,
  photoUrl,
  description,
  message,
  photoCaptured,
  timestamp,
}) {
  const formatter = buildFormatter(portugueseStrings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openChat = () => {
    if (!read) {
      dispatch(selectImage(photoCaptured));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      navigate("/Chats/view");
    }
  };
  return (
    <div className="chat" onClick={openChat}>
      <Avatar src={photoUrl} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>

        <p>
          {!read && " Clique para visualizar - "}{" "}
          <ReactTimeago
            date={new Date(timestamp?.toDate()).toUTCString()}
            formatter={formatter}
          />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
