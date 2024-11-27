import { createContext, useEffect, useState } from "react";

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
    const loggedIn = localStorage.getItem("userLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("localStorage_currentUser"));
    setUserLoggedIn(loggedIn);
    setCurrentUser(user);
  }, []);
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
