import questionApi from "../api/api";
import toast from "react-hot-toast";

const ConfidenceTable = ({
  selectedQuestionId,
  setSelectedQuestionId,
  setPopupVisible,
}) => {
  // Close the popup
  const closePopup = () => {
    console.log("Closing the popup");
    setPopupVisible(false); // Hide the popup
    setSelectedQuestionId(null); // Clear the selected question
  };

  // Handle difficulty selection
  const handleDifficultySelection = async (userRecallDifficulty) => {
    console.log(
      `User selected ${userRecallDifficulty} for`,
      selectedQuestionId
    );
    // get ID and currentInterval from the selectedQuestionId
    const currentCompleted = await questionApi.get(
      `/api/completed/${selectedQuestionId}`
    );
    console.log(currentCompleted);
    const { _id, title, currentInterval } = currentCompleted.data;

    let questionToUpdate = {
      _id,
      userRecallDifficulty,
      currentInterval,
    };

    await questionApi.post("/api/completed/update", questionToUpdate);
    toast.success(`${title} marked as revised`, {
      duration: 3000,
    });
    closePopup(); // Close the popup after selection
  };

  return (
    <div onClick={closePopup} className="z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div
          className="bg-slate-600 p-6 rounded-lg shadow-lg max-w-sm w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold mb-4 text-orange-200">
            {selectedQuestionId}
          </h3>
          <p className="mb-4 text-white">
            How would you rate the difficulty of this question?
          </p>
          <div className="flex justify-around">
            <button
              className="btn btn-success"
              onClick={() => handleDifficultySelection("Easy")}
            >
              Easy
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleDifficultySelection("Medium")}
            >
              Medium
            </button>
            <button
              className="btn btn-error"
              onClick={() => handleDifficultySelection("Hard")}
            >
              Hard
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn btn-outline" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceTable;
