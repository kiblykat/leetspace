import { useContext, useEffect } from "react";
import QuestionContext from "../contexts/QuestionContext";
import UserContext from "../contexts/UserContext";

const NewQuestion = () => {
  const { handleChange, foundLeets, addNewQn } = useContext(QuestionContext);
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg">
      <p className="text-center mb-3 font-mono">
        Simplifying your Leetcode grind through spaced repetition
      </p>
      <div className="flex flex-col p-6 rounded shadow-lg">
        <div className="flex flex-col">
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
                <th className="text-cyan-800">Title</th>
                <th className="text-cyan-800">Difficulty</th>
                <th className="text-cyan-800">Tags</th>
              </tr>
            </thead>
            <tbody>
              {foundLeets?.map((foundLeet) => (
                <tr
                  key={foundLeet.Question}
                  className="hover:bg-base-300 cursor-pointer border-gray-300 "
                  onClick={() =>
                    addNewQn(
                      currentUser.uid,
                      foundLeet.Question,
                      foundLeet.Question_Link,
                      foundLeet.Topic_tags,
                      foundLeet.Difficulty
                    )
                  }
                >
                  <td className="p-4">{foundLeet.Question}</td>
                  <td className="p-4">{foundLeet.Difficulty}</td>
                  <td className="p-4">
                    {foundLeet.Topic_tags.replace(/[[\]']/g, "")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
