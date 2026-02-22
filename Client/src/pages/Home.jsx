import React from "react";
import Navbar from "../components/Navbar";
import FilterButton from "../components/FilterButton";
import Status from "../components/Staus";
import TaskCard from "../components/TaskCard";
import BottomNav from "../components/BottomNav";
import AddCard from "../components/AddCard";
import no_task from "../assets/home_page/no_task_added.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  console.log(tasks);

  //ADD TASK HANDLER
  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

 const handleToggleComplete = async (id, currentStatus) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          completed: !currentStatus,
        }),
      }
    );

    if (!res.ok) return;

    // 🔥 Update state properly
    setTasks(prev =>
      prev.map(task =>
        task._id === id
          ? { ...task, completed: !currentStatus }
          : task
      )
    );

  } catch (err) {
    console.log(err);
  }
};

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
    <>
      <div className="bg-surface-app h-screen pb-24  overflow-y-auto">
        <Navbar />
        <div className="mx-(--space-4) ">
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

          {/* Task heading */}
          <h1 className="text-h2 font-bold mt-(--space-6)">Tasks</h1>

          {/* TASK LIST */}
          <div className="mt-(--space-4)">
            {tasks.length === 0 && (
              <div>
                <img
                  src={no_task}
                  alt="No task added yet"
                  className="w-64 mx-auto"
                />

                <p className="text-gray-400 text-center">No task added yet.</p>
              </div>
            )}
          </div>

          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onToggle = {handleToggleComplete}/>
          ))}

          {/* <TaskCard status={"work"} />
          <TaskCard status={"work"} />
          <TaskCard status={"work"} /> */}
        </div>
        <AddCard
          isOpen={isOpen}
          onAdd={handleAddTask}
          onClose={() => setIsOpen(false)}
        ></AddCard>

        <BottomNav onAddClick={() => setIsOpen(true)} />
      </div>
    </>
  );
};

export default Home;
