import { useContext } from "react";
import QuestionContext from "./contexts/QuestionContext";
import "./App.css";

function App() {
  const questionCtx = useContext(QuestionContext);

  const { questions, setQuestions, loading, setLoading, fetchQuestions } =
    questionCtx;

  return (
    <div className="App">
      <button className="btn" onClick={fetchQuestions}>
        getQuestions
      </button>
    </div>
  );
}

export default App;
