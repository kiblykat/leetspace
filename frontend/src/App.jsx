import { useContext } from "react";
import QuestionContext from "./contexts/QuestionContext";
import "./App.css";

function App() {
  const questionCtx = useContext(QuestionContext);

  const {
    // questions,
    // setQuestions,
    // loading,
    // setLoading,
    handleSubmit,
    fetchQuestions,
  } = questionCtx;

  return (
    <div className="App">
      <button className="btn m-2" onClick={fetchQuestions}>
        getQuestions
      </button>
      <form className="flex-col align-bottom justify-start">
        <div>
          <label>title</label>
          <input></input>
        </div>
        <div>
          <label className="p-2 m-2">link</label>
          <input className="p-2 m-2"></input>
        </div>
        <div className="p-2 m-2">
          <label>notes</label>
          <input></input>
        </div>
        <div className="p-2 m-2">
          <label>difficulty</label>
          <input></input>
        </div>
        <div className="p-2 m-2">
          <label>topic</label>
          <input></input>
        </div>
        <div className="p-2 m-2">
          <label>tags</label>
          <input></input>
        </div>
      </form>
      <button type="submit" onClick={handleSubmit} className="btn m-2">
        submit
      </button>
    </div>
  );
}

export default App;
