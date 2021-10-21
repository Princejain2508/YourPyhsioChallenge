import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import "./css/Header.css";

export default function Header({ user }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.id)
        .onSnapshot((snapshot) => {
          setUserData({
            name: snapshot._delegate._document.data.partialValue.mapValue.fields
              .name.stringValue,
            email:
              snapshot._delegate._document.data.partialValue.mapValue.fields
                .email.stringValue,
          });
        });
    } else {
      setUserData(null);
    }
  }, [user]);
  const onSignOut = (event) => {
    event.preventDefault();
    auth.signOut();
    let path = user ? "/" : "/login";
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <div className="header">
      <div className="header__option" onClick={onSignOut} id="/login">
        <span className="header__optionLineOne">
          {userData ? userData.name : "Hello Guest"}
        </span>
        <span className="header__optionLineTwo">
          {userData ? "Sign Out" : "Sign In"}
        </span>
      </div>
    </div>
  );
}
