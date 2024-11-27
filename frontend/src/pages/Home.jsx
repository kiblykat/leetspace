import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewQuestion from "../components/NewQuestion";
import QuestionList from "../components/QuestionList";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorage_userLoggedIn =
      localStorage.getItem("localStorage_userLoggedIn") === "true";
    if (!localStorage_userLoggedIn) {
      navigate("/login");
    }
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
