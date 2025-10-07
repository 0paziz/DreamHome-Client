import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  {/* If user is authenticated, render the children components; otherwise, redirect to login */}
  return user ? children : <Navigate to="/login" />;
}
