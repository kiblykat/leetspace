import { useContext } from "react";
import QuestionContext from "../contexts/QuestionContext";

const NewQuestion = () => {
  const questionCtx = useContext(QuestionContext);

  const { handleChange, foundLeets, addNewQn } = questionCtx;

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        LeetCode Spaced Repetition
      </h1>
      <p className="text-center mb-3">
        This App applies spaced repetition to leetcode problems, similar to ANKI
      </p>
      <form className="flex flex-col p-6 rounded shadow-lg">
        <div className="form-control">
          <label className="label font-bold text-xl">
            Add Leetcode Question to Repetition Bank:
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            placeholder="Search for Questions"
            onChange={handleChange}
            required
          />
          <table className="table table-auto ">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {foundLeets?.map((foundLeet) => (
                <tr
                  key={foundLeet.Question}
                  className="hover:bg-gray-800 cursor-pointer"
                  onClick={() =>
                    addNewQn(
                      foundLeet.Question,
                      foundLeet.Question_Link,
                      foundLeet.Topic_tags,
                      foundLeet.Difficulty
                    )
                  }
                >
                  <td>{foundLeet.Question}</td>
                  <td>{foundLeet.Difficulty}</td>
                  <td>{foundLeet.Topic_tags.replace(/[[\]']/g, "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default NewQuestion;