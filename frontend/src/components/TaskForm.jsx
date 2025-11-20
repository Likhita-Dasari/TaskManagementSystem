import { useState } from "react";

function TaskForm({ initialTitle = "", initialDescription = "", onSubmit, buttonText }) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };
 //form is to update and create task
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
        required
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "300px", height: "120px", padding: "10px" }}
      />
      <br /><br />

      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default TaskForm;
