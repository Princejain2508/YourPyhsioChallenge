import React, { useRef } from "react";
import "./css/Register.css";

import { auth, db } from "./firebase";

function Register() {
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");

  const dispatchEvent = () => {
    window.history.pushState({}, "", "/");
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((auth) => {
        db.collection("users").doc(auth.user.uid).set({
          name: name.current.value,
          email: auth.user.email,
        });
        dispatchEvent();
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="register">
      <div className="register__container">
        <h1>Sign-in</h1>
        <form onSubmit={register}>
          <h5>E-mail</h5>
          <input type="text" ref={email} required />
          <h5>Name</h5>
          <input type="text" ref={name} required />
          <h5>Password</h5>
          <input type="password" ref={password} required />

          <p>
            By signing in you agree to YourPhysio-Challenge Conditions of Use.
          </p>

          <button className="register__registerButton">
            Create Your YourPhysio Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
