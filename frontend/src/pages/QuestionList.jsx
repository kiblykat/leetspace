import axios from "axios";
import React, { useState } from "react";
import questionApi from "../api/api";

const QuestionList = () => {
  let [dueQuestions, setDueQuestions] = useState([]);
  const getDueQuestions = async () => {
    try {
      const response = await questionApi.get("api/completed/due");
      console.log(response);
      setDueQuestions(response.data.title);
    } catch (err) {
      console.log("error occured");
    }
  };
  setDueQuestions;
  return (
    <>
      <button onClick={getDueQuestions}>
        Click me to refresh due question
      </button>
      {/* <ul>
        {dueQuestions.map((dueQuestion) => {
          <li>{dueQuestion.title}</li>;
        })}
      </ul> */}
    </>
  );
};

export default QuestionList;
