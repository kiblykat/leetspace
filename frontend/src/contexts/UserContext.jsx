import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const context = {
    userLoggedIn,
    setUserLoggedIn,
    currentUser,
    setCurrentUser,
  };
  // === Implement persistent storage ===

  // Load userLoggedIn and currentUser from localStorage, EVERYTIME the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
