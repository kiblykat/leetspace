import NewQuestion from "./components/NewQuestion";
import QuestionList from "./components/QuestionList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <NewQuestion />
      <QuestionList />
      <Toaster  />
    </>
  );
}

export default App;
