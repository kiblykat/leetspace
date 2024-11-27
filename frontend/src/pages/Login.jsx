import { useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import leetspaceApi from "../api/api";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { userLoggedIn, setUserLoggedIn, setCurrentUser } =
    useContext(UserContext);
  let navigate = useNavigate();
  const handleGoogleLogin = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //set user and userLoggedIn states
      setCurrentUser(user);
      setUserLoggedIn(true);
      //set localStorage (prevent loss of state on refresh)
      localStorage.setItem("localStorage_userLoggedIn", "true");
      localStorage.setItem("localStorage_currentUser", JSON.stringify(user));
      let userExists = await leetspaceApi.get(`/api/users/${user.uid}`);
      if (!userExists.data) {
        console.log("Creating user...");
        await leetspaceApi.post("/api/users/create", {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      console.log("Login successful. Welcome", user.displayName);
      navigate("/home");
    } catch (err) {
      console.log("Login failed. Please try again.", err.message);
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/home");
    }
  }, [userLoggedIn, navigate]);

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg flex flex-col justify-center items-center min-h-screen">
      <div className="bg-base-300 m-5 p-24 shadow-2xl rounded-xl flex flex-col justify-center relative">
        <h1 className="text-3xl font-bold mb-2 text-center font-mono">
          LeetSpace(beta)
        </h1>
        <p className="font-mono mb-8">
          {`{`}leetcode through repetition{`}`};
        </p>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-orange-200 text-black hover:bg-orange-400"
        >
          Sign In with Google
        </button>
      </div>
      <div className="bottom-0 right-0 p-4 text-gray-500 flex flex-row items-center">
        <span className="text-center font-mono">Contact me: </span>
        <a
          href="https://github.com/kiblykat"
          target="_blank"
          rel="noreferrer"
          className="fa-brands fa-github text-3xl mx-2 hover:text-orange-300 transition-transform transform hover:scale-110"
        ></a>
        <a
          href="https://www.linkedin.com/in/izzat-fadzlon-75615b171/"
          target="_blank"
          rel="noreferrer"
          className="fa-brands fa-linkedin text-3xl mx-2 hover:text-orange-300 transition-transform transform hover:scale-110"
        ></a>
      </div>
    </div>
  );
};

export default Login;
