import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(Auth);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-medium"
      : "text-gray-400 hover:text-white transition";

  return (
    <nav className="bg-[#1c1f2b] border-b border-[#2a2e3f]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-red-500 tracking-wide"
        >
          Movie<span className="text-white">ForYou</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">

          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Signup
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          {/* Logout Button */}
          {user && (
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded bg-[#2a2e3f] hover:bg-[#3a3f55] text-white transition"
            >
              Logout
            </button>
          )}

          {/* User Avatar */}
          {user && (
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
              {(user.username || user.email)
                ?.charAt(0)
                .toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
