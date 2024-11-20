import { useState } from "react";
import questionApi from "../api/api";

const QuestionList = () => {
  let [dueQuestions, setDueQuestions] = useState([]);
  const getDueQuestions = async () => {
    try {
      const response = await questionApi.get("api/completed/due");
      setDueQuestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <div className="flex align-middle justify-center">
        <button className="btn" onClick={getDueQuestions}>
          Click me to refresh due question
        </button>
      </div>
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>LeetCode Link</th>
            <th>Last Reviewed</th>
            <th>Tags</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {dueQuestions.map((dueQuestion, index) => (
            <tr key={dueQuestion._id}>
              <th>{index + 1}</th>
              <td>{dueQuestion.title}</td>
              <td>
                <a
                  href={dueQuestion.leetcode_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {dueQuestion.link}
                </a>
              </td>
              <td>
                {dueQuestion.reviewDate.slice(
                  0,
                  dueQuestion.reviewDate.indexOf("T")
                )}
              </td>
              <td>{dueQuestion.tags.replace(/[[\]']/g, "")}</td>
              <td>{dueQuestion.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
