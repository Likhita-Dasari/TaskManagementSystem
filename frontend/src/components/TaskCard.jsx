//task card contain edit and delete buttons
function TaskCard({ task, onEdit, onDelete }) {
  
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><b>Status:</b> {task.status}</p>

      {/* <button onClick={() => onEdit(task._id)}>Edit</button> */}
      {onEdit && (
        <button onClick={() => onEdit(task._id)}>
            Edit
        </button>
    )}


    <button
        onClick={onDelete}
        style={{ marginLeft: "10px" }}
    >
        Delete
    </button>
    </div>
  );
}

export default TaskCard;
