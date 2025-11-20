import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in(checks the token)
  if (!token) return <Navigate to="/login" />;

  // Admin-only route check
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
