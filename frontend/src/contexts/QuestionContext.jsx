import { createContext, useState } from "react";
import questionApi from "../api/api";
import toast from "react-hot-toast";

let QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [foundLeets, setFoundLeets] = useState([]);
  const [title, setTitle] = useState("");

  //======================== QUESTIONLIST.JSX STATES ========================
  let [dueQuestions, setDueQuestions] = useState([]);
  //===========================================================================

  //======================== QUESTIONLIST.JSX FUNCTIONS ========================
  // Get all questions that are due for revision today
  const getDueQuestions = async () => {
    try {
      const response = await questionApi.get("api/completed/due");
      setDueQuestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //===========================================================================

  //======================== NEWQUESTION.JSX FUNCTIONS ========================
  //Add new question to the repetition bank
  const addNewQn = async (question, question_link, topic_tags, difficulty) => {
    try {
      let newQuestion = {
        title: question,
        link: question_link,
        tags: topic_tags,
        difficulty: difficulty,
      };
      console.log(
        `topic_tags is ${
          newQuestion.tags
        }, typeof topic_tags is ${typeof newQuestion.tags}`
      );
      let response = await questionApi.post(
        "/api/completed/create",
        newQuestion
      );
      console.log(`response is ${JSON.stringify(response.data)}`);
      toast.success(`${question} added to the repetition bank`, {
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error(`Error: ${err.response.data.error}`, { duration: 4000 });
    }
  };
  //===========================================================================
  // Get all questions from the database
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

  // Find leetcode questions that match the search query
  async function findLeets(name, value) {
    if (name === "title") {
      if (value !== "") {
        const response = await questionApi.post(
          "/api/leetcode_db/find-matching",
          {
            value,
          }
        );
        setFoundLeets(response.data);
      } else {
        setFoundLeets([]);
      }
    }
  }

  // Handle changes in the form fields
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    findLeets(name, value);
  };

  let context = {
    questions,
    setQuestions,
    loading,
    setLoading,
    getAllQuestions,
    title,
    setTitle,
    handleChange,
    foundLeets,
    setFoundLeets,
    dueQuestions,
    setDueQuestions,
    getDueQuestions,
    addNewQn,
  };

  return (
    <QuestionContext.Provider value={context}>
      {children}
    </QuestionContext.Provider>
  );
}

export default QuestionContext;
