import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8 text-center space-y-2">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">MovieForYou</span>.  
        All rights reserved.
      </p>

      <div className="flex justify-center gap-4 text-xs text-gray-500">
        <Link to="/login" className="hover:text-red-400 transition">
          Login
        </Link>
        <Link to="/signup" className="hover:text-red-400 transition">
          Sign Up
        </Link>
      </div>
    </footer>
  );
};

export default Footer;