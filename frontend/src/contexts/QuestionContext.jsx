import { createContext, useState } from "react";
import questionApi from "../api/api";

let QuestionContext = createContext();

// eslint-disable-next-line react/prop-types
export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  //question states
  const [title, setTitle] = useState("");

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

  const handleSubmit = async (title, link, notes, difficulty, topic, tags) => {
    //check if new question: if condition
    //if question has been done before: else condition
    let newQuestion = {
      title: title,
      link: link,
      notes: notes,
      difficulty: difficulty,
      topic: topic,
      tags: tags,
    };
    try {
      await questionApi.post("/api/questions", newQuestion);
    } catch (err) {
      console.log(err);
    }
    return;
  };

  let context = {
    questions,
    setQuestions,
    loading,
    setLoading,
    fetchQuestions,
    title,
    setTitle,
    handleSubmit,
  };

  return (
    <QuestionContext.Provider value={context}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
