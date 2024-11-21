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

  const revisedQuestion = async (title, link) => {
    try {
      window.open(link, "_blank");
    } catch (err) {
      console.error("Failed to open the link:", err.message);
    }
  };
  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg">
      <div className="flex align-middle justify-center">
        <button className="btn" onClick={getDueQuestions}>
          Refresh Questions due for Revision
        </button>
      </div>
      <table className="table table-auto w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Last Reviewed</th>
            <th>Tags</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {dueQuestions.map((dueQuestion, index) => (
            <tr
              key={dueQuestion._id}
              className="btn-ghost cursor-pointer"
              onClick={() =>
                revisedQuestion(dueQuestion.title, dueQuestion.link)
              }
            >
              <th>{index + 1}</th>
              <td>{dueQuestion.title}</td>
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
