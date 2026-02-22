const mongoose = require("mongoose");
const Todo = require("../model/Todo");

// CREATE Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, category, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      userId: req.user._id, //from JWT
      title,
      description,
      category,
      dueDate,
    });

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ALLL TODOS OF LOGGED IN USER and also for category and completed
exports.getTodos = async (req, res) => {
  try {
    const { category, completed } = req.query;

    //base filter (always logged-in user)
    let filter = { userId: req.user._id };

    //Filter by cataegory
    if (category && category !== "ALL") {
      filter.category = category;
    }

    //Filter by completion status
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }
    const todos = await Todo.find(filter).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//GET SINGLE TODO BY ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error:", error: err });
  }
};

//Update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true },
    );

    if (!todo)
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo)
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
