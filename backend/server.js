const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//To Load environment variables
dotenv.config();

const app = express();

// For Middleware
app.use(cors());
app.use(express.json());

//For Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// Import different route files 
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
