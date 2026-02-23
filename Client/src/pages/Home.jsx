import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterButton from "../components/FilterButton";
import Status from "../components/Staus";
import TaskCard from "../components/TaskCard";
import BottomNav from "../components/BottomNav";
import TaskEditor  from "../components/TaskEditor ";
import no_task from "../assets/home_page/no_task_added.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  // 🔥 NEW STATES FOR EDIT
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  // DELETE
  const handleDeleteFromUI = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // ADD
  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  // UPDATE
const handleUpdateTask = (updatedTask) => {
  setTasks((prev) =>
    prev.map((task) =>
      String(task._id) === String(updatedTask._id)
        ? updatedTask
        : task
    )
  );
};

  // EDIT CLICK
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditMode(true);
    setIsOpen(true);
  };

  // TOGGLE COMPLETE
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          completed: !currentStatus,
        }),
      });

      if (!res.ok) return;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id
            ? { ...task, completed: !currentStatus }
            : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:3000/api/todos/", {
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-surface-app h-screen pb-24 overflow-y-auto">
      <Navbar />

      <div className="mx-(--space-4)">
        <Status
          totalTasks={tasks.length}
          completedTasks={tasks.filter((t) => t.completed).length}
        />

        <div className="flex gap-(--space-4) overflow-auto">
          <FilterButton text="All Tasks" />
          <FilterButton text="Personal" />
          <FilterButton text="Urgent" />
          <FilterButton text="Work" />
        </div>

        <h1 className="text-h2 font-bold mt-(--space-6)">Tasks</h1>

        {tasks.length === 0 && (
          <div className="mt-(--space-4)">
            <img
              src={no_task}
              alt="No task"
              className="w-64 mx-auto"
            />
            <p className="text-gray-400 text-center">
              No task added yet.
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteFromUI}
            onEdit={handleEditClick}   // 👈 EDIT ADDED
          />
        ))}
      </div>

      <TaskEditor 
        isOpen={isOpen}
        onAdd={handleAddTask}
        onUpdate={handleUpdateTask}
        isEditMode={isEditMode}
        editTask={selectedTask}
        onClose={() => {
          setIsOpen(false);
          setIsEditMode(false);
          setSelectedTask(null);
        }}
      />

      <BottomNav
        onAddClick={() => {
          setIsEditMode(false);
          setSelectedTask(null);
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default Home;