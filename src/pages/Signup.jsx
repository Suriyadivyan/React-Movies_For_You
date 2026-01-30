import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: uuidv4(),
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Valid email is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );

      if (existingUser.data.length > 0) {
        toast.error("User already exists");
        return;
      }

      // Create user
      await axios.post("http://localhost:3000/users", formData);

      toast.success("Signup successful");
      navigate("/login");

      // Reset form
      setFormData({
        id: uuidv4(),
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Try again.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-6 text-center">
        Create your account
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded bg-slate-900 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded bg-slate-900 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded bg-slate-900 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition py-2 rounded text-white font-medium"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} MovieForYou. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);

};

export default Signup;
