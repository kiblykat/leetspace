import Navbar from "../components/Navbar";
import NewQuestion from "../components/NewQuestion";
import QuestionList from "../components/QuestionList";

const Home = () => {
  return (
    <>
      <Navbar />
      <NewQuestion />
      <QuestionList />
    </>
  );
};

export default Home;
