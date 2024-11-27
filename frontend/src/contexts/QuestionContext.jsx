import { createContext, useCallback, useState } from "react";
import leetspaceApi from "../api/api";
import toast from "react-hot-toast";

let QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [foundLeets, setFoundLeets] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  //======================== QUESTIONLIST.JSX STATES ========================
  let [dueQuestions, setDueQuestions] = useState([]);
  //===========================================================================

  //======================== QUESTIONLIST.JSX FUNCTIONS ========================
  // Get all questions that are due for revision today
  const getDueQuestions = async (uid) => {
    try {
      setLoading(true);
      if (uid !== undefined) {
        //pass uid here (this is on localhost:5000 not 5173)
        const response = await leetspaceApi.get(`api/completed/due/${uid}`);
        setDueQuestions(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //===========================================================================

  //======================== NEWQUESTION.JSX FUNCTIONS ========================
  //Add new question to the repetition bank
  const addNewQn = async (
    uid,
    question,
    question_link,
    topic_tags,
    difficulty
  ) => {
    try {
      let newQuestion = {
        uid: uid,
        title: question,
        link: question_link,
        tags: topic_tags,
        difficulty: difficulty,
      };

      let response = await leetspaceApi.post(
        "/api/completed/create",
        newQuestion
      );
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
      const response = await leetspaceApi.get("/api/questions");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  // Handle changes in the form fields
  const handleChange = async (e) => {
    const { value } = e.target;
    debouncedFindLeets(value); // Use the debounced function
  };

  // Debounce Function
  const debounce = (callback, delay = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout); // Clear any existing timeout
      timeout = setTimeout(() => {
        callback(...args); // Call the function after the delay
      }, delay);
    };
  };
  // impt: useCallback ensures the same instance of the function is used on every call
  const debouncedFindLeets = useCallback(debounce(findLeets), []);

  // Find leetcode questions that match the search query
  async function findLeets(value) {
    if (value !== "") {
      const response = await leetspaceApi.post(
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
