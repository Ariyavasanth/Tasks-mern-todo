import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import FilterButton from "../components/FilterButton";
import Status from "../components/Status.jsx";
import TaskCard from "../components/TaskCard";
import BottomNav from "../components/BottomNav";
import TaskEditor from "../components/TaskEditor";
import no_task from "../assets/home_page/no_task_added.svg";

import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api/apiFetch";

const Home = () => {
  const { requireAuth } = useContext(AuthContext);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // 🔥 FETCH TASKS (Public Home – no redirect)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await apiFetch("http://localhost:3000/api/todos/", {
          credentials: "include",
        });

        if (res.status === 401) {
          // Not logged in → just show empty tasks
          setTasks([]);
          return;
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks =
    selectedFilter === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedFilter);

  // DELETE (UI only)
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

  // EDIT CLICK (Protected)
  const handleEditClick = (task) => {
    requireAuth(() => {
      setSelectedTask(task);
      setIsEditMode(true);
      setIsOpen(true);
    });
  };

  // TOGGLE COMPLETE (Protected)
  const handleToggleComplete = (id, currentStatus) => {
    requireAuth(async () => {
      try {
        const res = await apiFetch(
          `http://localhost:3000/api/todos/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              completed: !currentStatus,
            }),
          }
        );

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
    });
  };

  return (
    <div className="bg-surface-app h-screen pb-24 overflow-y-auto">
      <Navbar />

      <div className="mx-(--space-4)">
        <Status
          totalTasks={tasks.length}
          completedTasks={tasks.filter((t) => t.completed).length}
        />

        <div className="flex gap-(--space-4) overflow-auto">
          {["All", "Personal", "Urgent", "Work"].map((filter) => (
            <FilterButton
              key={filter}
              text={filter}
              isActive={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            />
          ))}
        </div>

        <h1 className="text-h2 font-bold mt-(--space-6)">Tasks</h1>

        {tasks.length === 0 && (
          <div className="mt-(--space-4)">
            <img src={no_task} alt="No task" className="w-64 mx-auto" />
            <p className="text-gray-400 text-center">
              No task added yet.
            </p>
          </div>
        )}

        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteFromUI}
            onEdit={handleEditClick}
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
          requireAuth(() => {
            setIsEditMode(false);
            setSelectedTask(null);
            setIsOpen(true);
          });
        }}
      />
    </div>
  );
};

export default Home;