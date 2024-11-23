import { useContext, useEffect, useState } from "react";
import QuestionContext from "../contexts/QuestionContext.jsx";
import ConfidenceTable from "./ConfidenceTable.jsx";

const QuestionList = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const qnContext = useContext(QuestionContext);
  const { dueQuestions, getDueQuestions, revisedQuestion } = qnContext;

  useEffect(() => {
    getDueQuestions();
  }, [getDueQuestions]);

  const openQuestionLink = async (id, link) => {
    try {
      window.open(link, "_blank");
      console.log(id);
      setSelectedQuestionId(id); // Store the selected question
      setPopupVisible(true); // Show the popup
    } catch (err) {
      console.error("Failed to open the link:", err.message);
    }
  };

  return (
    <>
      <div className="container mx-auto my-10 p-6 bg-base-200 rounded shadow-lg">
        <div className="rounded shadow-lg">
          <h1 className="label font-bold text-xl">
            Questions due for revision today:{" "}
            <span className="text-orange-200">
              {`${new Date(Date.now()).toISOString().replace(/T.*/g, "")}`}
            </span>
          </h1>
          <div className="flex align-middle justify-center"></div>
          <table className="table table-auto w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Last Reviewed</th>
                <th>Tags</th>
                <th>Difficulty</th>
                <th>Revision Count</th>
                <th className="text-center">Revised</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {dueQuestions.map((dueQuestion, index) => (
                <tr
                  key={dueQuestion._id}
                  className="hover:bg-base-300 btn-ghost cursor-pointer z-10"
                  onClick={() =>
                    openQuestionLink(dueQuestion._id, dueQuestion.link)
                  }
                >
                  <td>{index + 1}</td>
                  <td>{dueQuestion.title}</td>
                  <td className="text-orange-200">
                    {dueQuestion.reviewDate.slice(
                      0,
                      dueQuestion.reviewDate.indexOf("T")
                    )}
                  </td>
                  <td>{dueQuestion.tags.replace(/[[\]']/g, "")}</td>
                  <td>{dueQuestion.difficulty}</td>
                  <td>{dueQuestion.timesReviewed}</td>
                  <td
                    className="text-center text-xl z-20 hover:bg-green-100"
                    data-tooltip="Mark as Revised"
                    onClick={(e) => {
                      e.stopPropagation();
                      revisedQuestion(
                        dueQuestion.title,
                        dueQuestion._id,
                        dueQuestion.difficulty,
                        dueQuestion.currentInterval
                      );
                    }}
                  >
                    ✅
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center m-5">
          <button className="btn bg-orange-300 text-black hover:bg-orange-400">
            View Current Repetition Bank
          </button>
        </div>
      </div>
      {/* DaisyUI Modal */}
      {popupVisible && (
        <ConfidenceTable
          selectedQuestionId={selectedQuestionId}
          setSelectedQuestionId={setSelectedQuestionId}
          setPopupVisible={setPopupVisible}
        />
      )}
    </>
  );
};

export default QuestionList;
