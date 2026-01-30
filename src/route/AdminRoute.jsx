import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(Auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
