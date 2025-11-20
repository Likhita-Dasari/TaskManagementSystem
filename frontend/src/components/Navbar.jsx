import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav
      style={{
        padding: "10px",
        borderBottom: "1px solid gray",
        marginBottom: "20px",
      }}
    >
      <h3 style={{ display: "inline", marginRight: "20px" }}>Task Manager</h3>

      {user ? (
        <>
          <span>
            Logged in as: <b>{user.username}</b> ({user.role})
          </span>

          <button
            onClick={logout}
            style={{ marginLeft: "20px" }}
          >
            Logout
          </button>

          <button
            onClick={() => navigate("/")}
            style={{ marginLeft: "10px" }}
          >
            Dashboard
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
