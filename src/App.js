import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Route from "./components/Route";
import { auth } from "./components/firebase";
import "./App.css";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          id: authUser.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="App">
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Home user={user} />
      </Route>
    </div>
  );
}

export default App;
