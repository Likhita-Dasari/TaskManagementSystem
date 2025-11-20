import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEditTask from "./pages/CreateEditTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard - Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Create Task - Protected */}
        <Route
          path="/task/new"
          element={
            <ProtectedRoute>
              <CreateEditTask />
            </ProtectedRoute>
          }
        />

        {/* Edit Task - Protected */}
        <Route
          path="/task/:id/edit"
          element={
            <ProtectedRoute>
              <CreateEditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
