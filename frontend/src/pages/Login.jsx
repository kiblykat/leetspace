import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit success");
    } catch (err) {
      setError("Login failed. Please try again. ");
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <form
        className="flex flex-col p-6 rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="form-control mb-4">
          <label className="label font-bold text-xl">Email:</label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label font-bold text-xl">Password:</label>
          <input
            type="password"
            name="password"
            className="input input-bordered"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="btn bg-orange-300 text-black hover:bg-orange-400"
          onClick={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
