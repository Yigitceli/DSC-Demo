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

export default function Navbar({ pp, setIsLoggedIn, user, setIsLoading }) {
  const logOut = () => {
    setIsLoggedIn(false);
    signOut(auth).then(() => {
      setIsLoading(false);
    });
  };
  return (
    <nav className="navbar navbar-light bg-dark p-3">
      <div
        className=" d-flex align-items-center w-100"
        style={{ height: "15vh" }}
      >
        <div style={{ flex: 1 }}>
          {pp && (
            <img
              src={pp}
              alt="profil"
              style={{ borderRadius: "50%", width: "120px" }}
            />
          )}
        </div>
        <span
          style={{ flex: 1 }}
          className="navbar-brand mb-0 m-0 h1 text-danger text-center fs-1 text-end"
        >
          Todos
        </span>
        <div style={{ flex: 1 }} className="text-end">
          {user && (
            <button type="button" className="btn btn-light" onClick={logOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
