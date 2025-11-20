import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import TaskForm from "../components/TaskForm";


function CreateEditTask() {
  const { id } = useParams(); // task id if editing
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If editing, load existing task
  const fetchTask = async () => {
    try {
      const res = await API.get("/tasks");
      const task = res.data.find((t) => t._id === id);

      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    } catch (error) {
      alert("Failed to load task");
    }
  };

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  // Handle Submit
  const handleSubmit = async (title, description) => {

    try {
      if (id) {
        // Update task
        await API.put(`/tasks/${id}`, { title, description });
        alert("Task updated");
      } else {
        // Create task
        await API.post("/tasks", { title, description });
        alert("Task created");
      }

      navigate("/");
    } catch {
      alert("Failed to save task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Task" : "Create Task"}</h2>

      <TaskForm
        initialTitle={title}
        initialDescription={description}
        buttonText={id ? "Update" : "Create"}
        onSubmit={({ title, description }) => handleSubmit(title, description)}
     />


      <br />
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default CreateEditTask;
