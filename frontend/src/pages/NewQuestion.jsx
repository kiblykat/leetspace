import { useContext, useState } from "react";
import QuestionContext from "../contexts/QuestionContext";
import questionApi from "../api/api";

const NewQuestion = () => {
  const questionCtx = useContext(QuestionContext);

  const addNewQn = async (question,question_link,topic_tags,difficulty) => {
    try{
      let newQuestion = {title:question,link:question_link,tags:topic_tags,difficulty:difficulty} 
      let response = await questionApi.post('/api/completed', newQuestion)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }
  const {
    // questions,
    // setQuestions,
    // loading,
    // setLoading,
    handleSubmit,
    // getAllQuestions,
    handleChange,
    foundQuestions,
  } = questionCtx;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">LeetCode ANKI</h1>

      <form
        className="flex flex-col bg-base-200 p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="form-control">
          <label className="label">Find Question</label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <table className="table table-auto ">
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
            <tbody>
              {console.log(foundQuestions)}
              {foundQuestions?.map((foundQn) => (
                <tr key={foundQn.Question}  className="hover:bg-gray-100 cursor-pointer" onClick={()=>addNewQn(foundQn.Question, foundQn.Question_Link, foundQn.Topic_tags, foundQn.Difficulty)}>
                  <td>{foundQn.Question}</td>
                  <td>{foundQn.Difficulty}</td>
                  <td>{foundQn.Topic_tags}</td>
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
