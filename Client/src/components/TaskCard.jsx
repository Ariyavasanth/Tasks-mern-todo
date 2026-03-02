import React, { useState, useEffect, useRef } from "react";
import work_icon from "../assets/home_page/work-icon.svg";
import personal_icon from "../assets/home_page/avatar-icon.svg";
import warning_icon from "../assets/home_page/warning-icon.svg";
import calander from "../assets/home_page/calender-icon.svg";
import taskMenu from "../assets/bottom_menus/task_card_menu.svg";
import { getBorderColor } from "../utils/taskStyles";
import { formatDueDate } from "../utils/dateUtils";
import { apiFetch } from "../api/apiFetch";

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const { title, description, category, dueDate, completed, _id } = task;

  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef(null);

  

  const categoryStyles = {
    Work: {
      bg: "bg-status-work-light",
      text: "text-status-work",
      icon: work_icon,
    },
    Personal: {
      bg: "bg-status-personal-light",
      text: "text-status-personal",
      icon: personal_icon,
    },
    Urgent: {
      bg: "bg-status-urgent-light",
      text: "text-status-urgent",
      icon: warning_icon,
    },
  };

  const isCompleted = completed;

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Professional DELETE using fetch
  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await apiFetch(`http://localhost:3000/api/todos/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log("Delete Response:", res);

      if (!res.ok) {
        const data = await res.json(); // 👈 read backend message
        alert(data.message); // 👈 show REAL reason
        return;
      }

      onDelete(_id); // update UI from parent
      setOpenMenu(false);
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-(--space-6)">
      <div
        className={`${
          isCompleted ? "bg-[#CDCED0]" : "bg-white"
        } border-l-[3.5px] shadow-md ${getBorderColor(
          isCompleted ? "Completed" : category,
        )} p-(--space-5) flex gap-(--space-4) rounded-(--radius-xl)`}
      >
        {/* Toggle Button */}
        <div
          onClick={() => onToggle(_id, isCompleted)}
          className={`w-5 h-5 mt-1.5 shrink-0 rounded-full border-2 
          flex items-center justify-center cursor-pointer
          ${isCompleted ? "border-none" : "border-search-icon"}`}
        >
          {isCompleted && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 8C0 3.582 3.582 0 8 0s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zm7 4l5-6-1-1-4 5-2-2-1 1 3 3z"
                fill="#10B981"
              />
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-(--space-4) min-w-0">
          <div className="flex flex-col gap-(--space-3)">
            <p
              className={`font-bold text-h2 ${
                isCompleted ? "line-through" : ""
              }`}
            >
              {title}
            </p>

            <p
              className={`text--description font-light ${
                isCompleted ? "line-through" : ""
              }`}
            >
              {description}
            </p>
          </div>

          <div className="flex gap-(--space-5) items-center">
            {categoryStyles[category] && (
              <div
                className={`flex ${categoryStyles[category].bg}
                px-(--space-2) py-(--space-1) gap-1 rounded-4xl`}
              >
                <img src={categoryStyles[category].icon} alt="category icon" />
                <p className={categoryStyles[category].text}>{category}</p>
              </div>
            )}

            <div className="flex gap-(--space-1)">
              {isCompleted ? (
                <p className="text-green-500 text-sm font-medium">Completed</p>
              ) : (
                <div className="flex items-center gap-1">
                  <img src={calander} className="w-4" alt="calendar" />
                  <p className="text-sm">{formatDueDate(dueDate)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="relative ml-auto" ref={menuRef}>
          <img
            src={taskMenu}
            alt="Task Menu"
            onClick={() => setOpenMenu(!openMenu)}
            className="cursor-pointer"
          />

          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border z-50">
              <button
                onClick={() => onEdit(task)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
