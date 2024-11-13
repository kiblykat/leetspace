import { useContext } from "react";
import QuestionContext from "./contexts/QuestionContext";
import "./App.css";

function App() {
  const questionCtx = useContext(QuestionContext);

  const {
    // questions,
    // setQuestions,
    // loading,
    // setLoading,
    handleSubmit,
    fetchQuestions,
    handleChange,
    formData,
    handleTopicSelect,
  } = questionCtx;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">LeetCode Tracker</h1>

      <form
        className="flex flex-col bg-base-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">Link</label>
          <input
            type="url"
            name="link"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">Notes</label>
          <input
            type="text"
            name="notes"
            className="input input-bordered"
            onChange={handleChange}
          />
        </div>

        <div className="form-control mt-4">
          <label className="label">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            className="input input-bordered"
            onChange={handleChange}
          />
        </div>

        <div className="dropdown mt-4">
          <div tabIndex={0} role="button" className="btn m-1">
            Topic
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-slate-600 rounded-box z-1 w-52 p-2 shadow"
          >
            {[
              "Arrays and Hashing",
              "Two Pointers",
              "Stack",
              "Binary Search",
              "Sliding Window",
              "Linked List",
              "Trees",
              "Tries",
              "Backtracking",
              "Heap/Priority Queue",
              "Graphs",
              "1-D DP",
              "Intervals",
              "Greedy",
              "Advanced Graphs",
              "2-D DP",
              "Bit Manipulation",
              "Math & Geometry",
            ].map((topic) => (
              <li key={topic} onClick={() => handleTopicSelect(topic)}>
                <a>{topic}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-control mt-4">
          <label className="label">Tags</label>
          <input
            type="text"
            name="tags"
            className="input input-bordered"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
