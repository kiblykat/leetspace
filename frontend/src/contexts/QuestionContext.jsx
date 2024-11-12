import { createContext, useState } from "react";
import questionApi from "../api/api";

let QuestionContext = createContext();

// eslint-disable-next-line react/prop-types
export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchQuestions() {
    setLoading(true);
    try {
      const response = await questionApi.get("/api/questions");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  let context = {
    questions,
    setQuestions,
    loading,
    setLoading,
    fetchQuestions,
  };

  return (
    <QuestionContext.Provider value={context}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
