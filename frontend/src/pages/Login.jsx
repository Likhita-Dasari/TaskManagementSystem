import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { username, password });

      // Backend returns something like:
      // { token, user: { id, username, role } }
      login(res.data.user, res.data.token);

      navigate("/");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
