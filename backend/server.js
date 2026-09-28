const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Todo = require("./models/Todo");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/tasks", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/tasks", async (req, res) => {
  console.log(req.body);
  const newTodo = await Todo.create({
    task: req.body.task,
  });
  res.status(201).json(newTodo);
});
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }
    if (req.body.task !== undefined) {
      todo.task = req.body.task;
    }
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
});
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.json({
      message: "Task deleted sucessfully",
      task: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
