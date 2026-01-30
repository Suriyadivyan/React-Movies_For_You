import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { login } = useContext(Auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );

      if (!res.data.length) {
        toast.error("Invalid credentials");
        return;
      }

      const user = res.data[0];
      login(user);

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-sm bg-[#1c1f2b] border border-[#2a2e3f] rounded-lg p-6 shadow-lg">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Sign in to BookMyShow
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-3 py-2 text-sm rounded bg-[#111827] border border-[#2a2e3f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 text-sm rounded bg-[#111827] border border-[#2a2e3f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-2 rounded text-white font-medium"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-4">
          New to BookMyShow?{" "}
          <Link to="/signup" className="text-red-400 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
