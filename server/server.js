const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const Todo = require("./models/Todo");
app.use(cors());
app.use(express.json());

//mongoose.connect("MONGO_URI");
const connectString = process.env.MONGO_URI;
mongoose
  .connect(connectString)
  .then(() => console.log("Connected to the database…"))
  .catch((err) => console.error("Connection error:", err));

//Routes
// get all the tasks
app.get("/todo", async (req, res) => {
  const allToDos = await Todo.find();
  res.json(allToDos);
});
// Create new todo
app.post("/todo/new", async (req, res) => {
  const newTask = await Todo.create(req.body);
  res.status(201).json({ newTask });
});
// Update an existing todo
app.put("/todo/update/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json(updatedTodo);
});
// Delete todo
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
