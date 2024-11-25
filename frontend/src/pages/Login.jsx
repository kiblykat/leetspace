import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const handleGoogleLogin = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (err) {
      setError("Login failed. Please try again. ");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg flex flex-col justify-center items-center min-h-screen">
      {userLoggedIn && navigate("/home")}
      <div className="bg-base-300 m-5- p-24 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">LeetSpace</h1>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-orange-200 text-black hover:bg-orange-400"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
