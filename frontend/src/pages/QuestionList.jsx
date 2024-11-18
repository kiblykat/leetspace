import { useState } from "react";
import questionApi from "../api/api";

const QuestionList = () => {
  let [dueQuestions, setDueQuestions] = useState([]);
  const getDueQuestions = async () => {
    try {
      const response = await questionApi.get("api/completed/due");
      console.log(response);
      setDueQuestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button onClick={getDueQuestions}>
        Click me to refresh due question
      </button>
      {dueQuestions.map((dueQuestion) => (
        <ul key={dueQuestion._id}>
          <li>{dueQuestion.title}</li>
        </ul>
      ))}
    </>
  );
};

export default QuestionList;
