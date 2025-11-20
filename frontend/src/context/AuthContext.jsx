import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // logged-in user
  const [token, setToken] = useState(null);   // JWT token

  // Load user & token from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Login - save token & user to local storage
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  // Logout - clear user details stored in local storage
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
