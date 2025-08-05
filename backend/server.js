const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // JSON body ko read karne ke liye

// MongoDB connect karega (next step me docker se link hoga)
mongoose.connect("mongodb://mongo:27017/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"));

const Todo = mongoose.model("Todo", {
  text: String,
});

// Add todo
app.post("/add", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.send("✅ Todo added!");
});

// Get all todos
app.get("/all", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));


