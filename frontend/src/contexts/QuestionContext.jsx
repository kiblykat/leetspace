import { createContext, useState } from "react";
import questionApi from "../api/api";

let QuestionContext = createContext();

// eslint-disable-next-line react/prop-types
export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [foundQuestions, setFoundQuestions] = useState([]);

  //question states
  const [title, setTitle] = useState("");

  async function getAllQuestions() {
    setLoading(true);
    try {
      const response = await questionApi.get("/api/questions");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "title") {
      const response = await questionApi.post(
        "/api/leetcode_db/find-matching",
        {
          value,
        }
      );
      setFoundQuestions(response.data);
    }
  };

  const handleTopicSelect = (topic) => {
    setFormData({
      ...formData,
      topic, // update the topic field in formData
    });
  };

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
    getAllQuestions,
    title,
    setTitle,
    handleSubmit,
    handleChange,
    handleTopicSelect,
    foundQuestions,
    setFoundQuestions,
  };

  return (
    <QuestionContext.Provider value={context}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
