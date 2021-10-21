import React, { useRef } from "react";
import "./css/Login.css";

import { auth } from "./firebase";

function Login() {
  const email = useRef("");
  const password = useRef("");

  const dispatchEvent = (path) => {
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((auth) => {
        dispatchEvent("/");
      })
      .catch((e) => alert(e));
  };

  const register = (e) => {
    e.preventDefault();
    dispatchEvent("/register");
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" ref={email} required />
          <h5>Password</h5>
          <input type="password" ref={password} required />

          <button className="login__signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>

        <p>
          By signing in you agree to YourPhysio-Challenge Conditions of Use.
        </p>

        <button className="login__registerButton" onClick={register}>
          Create Your YourPhysio Account
        </button>
      </div>
    </div>
  );
}

export default Login;
