import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const context = {
    userLoggedIn,
    setUserLoggedIn,
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
