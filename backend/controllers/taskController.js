const Task = require("../models/Task");


// Create Task

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).send("Title is required");
    }

    if (req.user.role === "admin") {
      return res.status(403).send("Admins cannot create tasks");
    }


    await Task.create({
      title,
      description,
      status: status || "pending",
      createdBy: req.user.id,
    });

    return res.status(201).send("Task created");
  } catch (error) {
    return res.status(500).send("Server error");
  }
};


// Geting Tasks is different from role(Admin: all, User: own)

const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ createdBy: req.user.id });
    }

    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};


// Update Task

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).send("Task not found");

    // Normal user can update only his/her own task
    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id) {
      return res.status(403).send("Not allowed");
    }

    const { title, description, status } = req.body;

    await Task.findByIdAndUpdate(taskId, { title, description, status });

    return res.status(200).send("Task updated");
  } catch (error) {
    return res.status(500).send("Server error");
  }
};


// Delete Task

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).send("Task not found");

    // Only  admin can delete
    if (req.user.role !== "admin" && task.createdBy.toString() !== req.user.id) {
      return res.status(403).send("Not allowed");
    }

    await Task.findByIdAndDelete(taskId);
    return res.status(200).send("Task deleted");
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
