import { useContext, useState } from "react";
import QuestionContext from "../contexts/QuestionContext";
import questionApi from "../api/api";

const NewQuestion = () => {
  const questionCtx = useContext(QuestionContext);

  function addNewQn(){
    return
  }
  const {
    // questions,
    // setQuestions,
    // loading,
    // setLoading,
    handleSubmit,
    // getAllQuestions,
    handleChange,
    formData,
    handleTopicSelect,
    foundQuestions,
    setFoundQuestions,
  } = questionCtx;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">LeetCode ANKI</h1>

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
          {/* <button
            className="btn"
            onClick={() => getMatchingLeets(foundQuestions)}
          >
            Find Question
          </button> */}
          <table className="table table-auto w-full">
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
            <tbody>
              {console.log(foundQuestions)}
              {foundQuestions?.map((foundQn) => (
                <tr key={foundQn.Question}  className="hover:bg-gray-100 cursor-pointer" onClick={addNewQn}>
                  <td>{foundQn.Question}</td>
                  <td>{foundQn.Difficulty}</td>
                  <td>{foundQn.Topic_tags}</td>
                </tr>
              ))}
            </tbody>
          </table>
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


        <button type="submit" className="btn btn-primary mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
