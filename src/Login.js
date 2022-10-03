import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          logIn({
            username: result.user.displayName,
            photoUrl: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://images.ctfassets.net/adclj4ijug4e/lQyPY2Kxx3dKDt7M4ioDc/afa15b3c1576dbdc67e4b3396c5fa84e/ghostlogo.svg"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          {" "}
          Entrar{" "}
        </Button>
      </div>
    </div>
  );
}

export default Login;
