import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Preview from "./Preview";
import Chats from "./Chats";
import WebcamCapture from "./WebcamCapture";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          logIn({
            username: authUser.displayName,
            photoUrl: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://images.ctfassets.net/adclj4ijug4e/lQyPY2Kxx3dKDt7M4ioDc/afa15b3c1576dbdc67e4b3396c5fa84e/ghostlogo.svg"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Routes>
                  <Route exact path="/Preview" element={<Preview />} />
                  <Route exact path="/Chats" element={<Chats />} />
                  <Route exact path="/Chats/view" element={<ChatView />} />
                  <Route path="/" element={<WebcamCapture />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
