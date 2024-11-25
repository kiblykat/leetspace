import React from "react";
import { auth } from "../firebase/firebase";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn, user, setUser } =
    useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserLoggedIn(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error.message);
    }
  };

  return (
    <>
      <div className="mx-auto rounded-lg container bg-base-200 mb-4">
        <div className="flex flex-row items-center justify-between p-4">
          <div className="text-xl text-center align-middle">
            Hello,{" "}
            <span className="text-orange-300 font-semibold">
              {user?.displayName}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-center font-mono">
            LeetSpace();
          </h1>
          <button
            className="text-black font-semibold items-center btn-ghost shadow-md rounded bg-orange-300 p-3 px-4 hover:bg-orange-400"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
