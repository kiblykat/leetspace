import { useEffect, useState } from "react";
import questionApi from "../api/api";
import { useNavigate } from "react-router-dom";

const Bank = () => {
  const [bankQuestions, setBankQuestions] = useState([]);
  const navigate = useNavigate();

  let getRevisionBank = async () => {
    try {
      const response = await questionApi.get("/api/completed");
      console.log(response);
      setBankQuestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRevisionBank();
  }, []);

  return (
    <>
      <div className="container mx-auto my-10 p-6 bg-base-200 rounded shadow-lg flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Revision Bank</h1>
        <div className="rounded shadow-lg flex flex-col p-6 ">
          <div className="flex align-middle justify-center"></div>
          <table className="table table-auto w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Difficulty</th>
                <th>Next Review</th>
                <th>Review Count</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {bankQuestions.map((question, index) => (
                <tr
                  key={question._id}
                  className="hover:bg-base-300 btn-ghost cursor-pointer z-10"
                >
                  <td>{index + 1}</td>
                  <td>{question.title}</td>
                  <td>{question.tags}</td>
                  <td>{question.difficulty}</td>
                  <td>{question.reviewDate}</td>
                  <td>{question.reviewCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-primary mt-4 w-auto"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Bank;
