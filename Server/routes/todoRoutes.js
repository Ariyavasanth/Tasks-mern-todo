const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../model/Todo");

const { protect } = require("../middleware/authMiddleware");

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  test,
} = require("../controller/todoController");

router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.get("/:id", protect, getTodoById);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);
router.get("/test", protect, test);

module.exports = router;
