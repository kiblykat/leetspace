import { useContext, useEffect, useState } from "react";
import leetspaceApi from "../api/api";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import QuestionContext from "../contexts/QuestionContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Bank = () => {
  const [bankQuestions, setBankQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { currentUser, userLoggedIn } = useContext(UserContext);

  const { loading, setLoading } = useContext(QuestionContext);

  let getRevisionBank = async (user) => {
    try {
      setLoading(true);
      const response = await leetspaceApi.get(`/api/completed/${user?.uid}`);
      setBankQuestions(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        getRevisionBank(user);
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <>
      <div className="container mx-auto my-10 p-6 bg-base-200 rounded shadow-lg flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center font-mono">
          Revision Bank
        </h1>
        <div className="rounded shadow-lg flex flex-col p-6 ">
          <input
            type="text"
            name="title"
            className="input input-bordered"
            placeholder="Search for Questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex align-middle justify-center"></div>
          <div className="overflow-x-auto">
            <table className="table table-auto w-full">
              {/* Table Head */}
              <thead>
                <tr>
                  <th className="text-cyan-700">#</th>
                  <th className="text-cyan-700">Title</th>
                  <th className="text-cyan-700">Tags</th>
                  <th className="text-cyan-700">Difficulty</th>
                  <th className="text-cyan-700">Next Review</th>
                  <th className="text-cyan-700">Review Count</th>
                </tr>
              </thead>
              {/* Table Body */}
              {loading ? (
                <div className="flex justify-center items-center">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span className="visually-hidden">||</span>
                  </div>
                </div>
              ) : (
                <tbody>
                  {bankQuestions
                    .filter((question) =>
                      question.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((question, index) => (
                      <tr
                        key={question._id}
                        className="hover:bg-base-300 btn-ghost cursor-pointer z-10"
                      >
                        <td>{index + 1}</td>
                        <td>{question.title}</td>
                        <td>{question.tags}</td>
                        <td>{question.difficulty}</td>
                        <td>
                          {question.reviewDate.slice(
                            0,
                            question.reviewDate.indexOf("T")
                          )}
                        </td>
                        <td>{question.reviewCount}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="btn mt-4 w-auto text-black bg-orange-300 p-3 px-4 hover:bg-orange-400"
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
