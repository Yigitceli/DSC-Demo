import "./App.css";
import { auth, db } from "./config/firebase-config";
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import Navbar from "./components/Navbar";
import Authenticate from "./pages/Authenticate";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

import { useEffect, useState } from "react";
import Todos from "./pages/Todos";

const provider = new GoogleAuthProvider();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const loginWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        await setDoc(doc(db, "Users", user?.uid), {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
        });

        const todosRef = doc(db, "Todos", user?.uid);
        const todosSnap = await getDoc(todosRef);

        if (!todosSnap.exists()) {          
          await setDoc(doc(db, "Todos", user?.uid), { todos: [] });
        }

        setIsLoggedIn(true);
      }
    });
  }, [user]);

  return (
    <div className="App">
      <Navbar pp={user?.photoURL} setIsLoggedIn={setIsLoggedIn} />
      {!isLoggedIn ? (
        <Authenticate loginWithGoogle={loginWithGoogle} />
      ) : (
        <Todos pp={user?.photoURL} user={user} />
      )}
    </div>
  );
}

export default App;
