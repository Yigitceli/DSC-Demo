import React from "react";
import { auth, logOut } from "../config/firebase-config";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "@firebase/auth";

export default function Navbar({ pp, setIsLoggedIn }) {
  const logOut = () => {
    setIsLoggedIn(false);
    signOut(auth).then(() => {});
  };
  return (
    <nav className="navbar navbar-light bg-dark p-3" style={{ height: "15vh" }}>
      <div className=" d-flex align-items-center w-100">
        <div>
          {pp && <img src={pp} alt="profil" style={{ borderRadius: "50%" }} />}
        </div>
        <span
          style={{ flex: 1 }}
          className="navbar-brand mb-0 m-0 h1 text-danger fs-1 text-end"
        >
          Todos
        </span>
        <div style={{ flex: 1 }} className="text-end">
          <button type="button" className="btn btn-light" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
