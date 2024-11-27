import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewQuestion from "../components/NewQuestion";
import QuestionList from "../components/QuestionList";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Home = () => {
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe(); // Cleanup the listener
  }, [userLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <NewQuestion />
      <QuestionList />
    </>
  );
};

export default Home;
