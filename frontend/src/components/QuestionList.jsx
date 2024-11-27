import { useContext, useEffect, useState } from "react";
import QuestionContext from "../contexts/QuestionContext.jsx";
import ConfidenceTable from "./ConfidenceTable.jsx";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext.jsx";

const QuestionList = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const qnContext = useContext(QuestionContext);
  const { loading, setLoading, dueQuestions, getDueQuestions } = qnContext;
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDueQuestions(currentUser?.uid);
    if (currentUser?.uid !== undefined) {
      console.log("Getting due questions for user with uid:", currentUser.uid);
    }
  }, [selectedQuestionId]);

  const openQuestionLink = async (id, link) => {
    try {
      window.open(link, "_blank");
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
            Questions due for revision today:
            <span className="text-orange-400">
              {`${new Date(Date.now()).toISOString().replace(/T.*/g, "")}`}
            </span>
          </h1>
          <div className="flex align-middle justify-center"></div>
          <table className="table table-auto w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="text-cyan-700">#</th>
                <th className="text-cyan-700">Title</th>
                <th className="text-cyan-700">Last Reviewed</th>
                <th className="text-cyan-700">Tags</th>
                <th className="text-cyan-700">Difficulty</th>
                <th className="text-cyan-700">Revision Count</th>
              </tr>
            </thead>
            {/* Table Body */}
            {loading ? (
              <div className="flex justify-center items-center">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <span className="">||</span>
                </div>
              </div>
            ) : (
              <tbody>
                {dueQuestions.map((dueQuestion, index) => (
                  <tr
                    key={dueQuestion._id}
                    className="hover:bg-base-300 border-gray-300 cursor-pointer z-10"
                    onClick={() =>
                      openQuestionLink(dueQuestion._id, dueQuestion.link)
                    }
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{dueQuestion.title}</td>
                    <td className="p-4 font-semibold text-orange-400">
                      {dueQuestion.reviewDate.slice(
                        0,
                        dueQuestion.reviewDate.indexOf("T")
                      )}
                    </td>
                    <td className="p-4">
                      {dueQuestion.tags.replace(/[[\]']/g, "")}
                    </td>
                    <td className="p-4">{dueQuestion.difficulty}</td>
                    <td className="p-4">{dueQuestion.reviewCount}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="flex justify-center m-5">
          <button
            className="btn bg-orange-300 text-black hover:bg-orange-400"
            onClick={() => navigate("/bank")}
          >
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
          dueQuestions={dueQuestions}
        />
      )}
    </>
  );
};

export default QuestionList;
