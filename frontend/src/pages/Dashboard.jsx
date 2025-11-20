import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      // In Dashboard.js, before the final return statement
    //console.log("Tasks to display:", res.data); 

      setTasks(res.data); // Backend returns array of tasks
    } catch (error) {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // refresh list
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username} ({user?.role})</p>

      {user.role === "user" && (
        <button onClick={() => navigate("/task/new")}>Create Task</button>
    )}

      <hr />
        {tasks.map((task) => (
  <TaskCard
    key={task._id}
    task={task}

    // Editing allowed only for normal user
    onEdit={user.role === "user" ? (id) => navigate(`/task/${id}/edit`) : null}

    // Admin or owner can delete (backend logic handles authorization)
    onDelete={()=> handleDelete(task._id)}
  />
))}
      
    </div>
  );
}

export default Dashboard;
