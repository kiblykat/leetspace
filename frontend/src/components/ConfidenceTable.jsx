const ConfidenceTable = ({
  selectedQuestion,
  setSelectedQuestion,
  setPopupVisible,
}) => {
  // Close the popup
  const closePopup = () => {
    console.log("Closing the popup");
    setPopupVisible(false); // Hide the popup
    setSelectedQuestion(null); // Clear the selected question
  };

  // Handle difficulty selection
  const handleDifficultySelection = (difficulty) => {
    console.log(`User selected ${difficulty} for`, selectedQuestion);
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
            {selectedQuestion}
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
