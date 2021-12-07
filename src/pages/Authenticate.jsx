import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";

import { auth } from "../config/firebase-config";

export default function Authenticate({loginWithGoogle}) {

  
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <GoogleButton onClick={loginWithGoogle} />
    </div>
  );
}
