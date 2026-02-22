import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const AddCard = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");

const handleAddClick = async () => {
  if (!title) return;

  try {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // VERY IMPORTANT
      body: JSON.stringify({
        title,
        description,
        category,
        dueDate,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add todo");
      return;
    }

    onAdd(data.todo); // Add real DB data to UI
    resetForm();
    onClose();
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  // reset form to default values
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Work");
    setDueDate("");
  };

  return (
    <motion.div
      className="
        fixed bottom-0 left-0 w-full
        bg-white border-2 border-gray-300
        rounded-t-xl
        flex flex-col gap-4
        px-(--space-4)
        pb-[52px]
        z-999
      "
      /* start hidden */
      initial={{ y: "100vh" }}
      /* open / close */
      animate={{ y: isOpen ? 0 : "100vh" }}
      /* smooth motion */
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      /* DRAG SETTINGS */
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.4}
      dragMomentum={false}
      /* DRAG CLOSE LOGIC */
      onDragEnd={(event, info) => {
        if (info.offset.y > 120 || info.velocity.y > 500) {
          onClose();
        }
      }}
    >
      {/* Drag Handle */}
      <div className="flex justify-center pt-3 cursor-grab">
        <div className="h-1 w-10 rounded-full bg-gray-300" />
      </div>

      <p className="pt-3 text-h3 font-semibold">Add New Task</p>

      {/* Task title */}
      <div>
        <p className="text-xl mb-1 font-medium">Task Title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full outline-brand-primary border rounded px-2 py-1"
        />
      </div>

      {/* Description */}
      <div>
        <p className="text-xl mb-1 font-medium">Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border outline-brand-primary rounded w-full h-24 p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xl mb-1 font-medium">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-300 outline-brand-primary px-3 py-4 border-2 rounded"
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Urgent</option>
          </select>
        </div>

        <div>
          <p className="text-xl mb-1 font-medium">Due Date</p>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border-gray-300 outline-brand-primary px-3 py-4 border-2 rounded"
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4 ">
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="border border-gray-300 rounded h-[52px] hover:bg-btn-hover hover:text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleAddClick}
          className="bg-brand-primary text-white rounded h-[52px] hover:bg-btn-hover"
        >
          Add Task
        </button>
      </div>
    </motion.div>
  );
};

export default AddCard;
