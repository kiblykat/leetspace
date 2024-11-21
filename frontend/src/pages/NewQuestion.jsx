import { useContext } from "react";
import QuestionContext from "../contexts/QuestionContext";
import questionApi from "../api/api";

const NewQuestion = () => {
  const questionCtx = useContext(QuestionContext);

  const addNewQn = async (question, question_link, topic_tags, difficulty) => {
    try {
      let newQuestion = {
        title: question,
        link: question_link,
        tags: topic_tags,
        difficulty: difficulty,
      };
      console.log(
        `topic_tags is ${
          newQuestion.tags
        }, typeof topic_tags is ${typeof newQuestion.tags}`
      );
      let response = await questionApi.post("/api/completed", newQuestion);
      console.log(`response is ${JSON.stringify(response.data)}`);
    } catch (err) {
      console.log(err);
    }
  };
  const {
    // questions,
    // setQuestions,
    // loading,
    // setLoading,
    handleSubmit,
    // getAllQuestions,
    handleChange,
    foundLeets,
  } = questionCtx;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        LeetCode Spaced Repetition
      </h1>
      <p className="text-center mb-3">
        This App applies spaced repetition to leetcode problems, similar to ANKI
      </p>
      <form
        className="flex flex-col bg-base-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
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
