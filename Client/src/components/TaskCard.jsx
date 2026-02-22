import React from "react";
import work_icon from "../assets/home_page/work-icon.svg";
import personal_icon from "../assets/home_page/avatar-icon.svg";
import warning_icon from "../assets/home_page/warning-icon.svg";

import calander from "../assets/home_page/calender-icon.svg";
import taskMenu from "../assets/bottom_menus/task_card_menu.svg";
import { getBorderColor } from "../utils/taskStyles";
import { useState } from "react";

import { formatDueDate } from "../utils/dateUtils";

const TaskCard = ({ task,onToggle  }) => {
  const { title, description, category, dueDate } = task;

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

  const isCompleted = task.completed;

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="mt-(--space-6)">
      <div
        className={`${
          isCompleted ? "bg-[#CDCED0]" : "bg-white"
        } border-l-[3.5px] shadow-2xl ${getBorderColor(isCompleted ? "Completed" : category)} p-(--space-5)  flex gap-(--space-4) rounded-(--radius-xl)`}
      >
        {/* radio btn */}
        <div
          onClick={() => onToggle(task._id, task.completed)}
          className={`w-5 h-5 mt-1.5 shrink-0 rounded-full border-2 
  flex items-center justify-center cursor-pointer
  ${isCompleted ? "border-none" : "border-search-icon"}`}
        >
          {isCompleted && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM7.54347 11.424L12.1493 5.66613L11.3173 5.00053L7.38987 9.90827L4.608 7.5904L3.92533 8.4096L7.54347 11.424Z"
                fill="#10B981"
              />
            </svg>
          )}
        </div>

        {/* Content isnide the todo card */}
        <div className={`flex flex-col gap-(--space-4) min-w-0 `}>
          <div className="flex flex-col gap-(--space-3)">
            <p
              className={`font-bold text-h2 wrap-break-word ${
                isCompleted ? "line-through " : ""
              }`}
            >
              {title}
            </p>

            <p
              className={`text--description font-light wrap-break-word ${
                isCompleted ? "line-through " : ""
              }`}
            >
              {description}
            </p>
          </div>

          <div className="flex  gap-(--space-5) items-center">
            {categoryStyles[category] && (
              <div
                className={`flex ${categoryStyles[category].bg}
      px-(--space-2) py-(--space-1) gap-1 rounded-4xl shrink-0`}
              >
                <img
                  src={categoryStyles[category].icon}
                  alt={`${category} icon`}
                />
                <p className={categoryStyles[category].text}>{category}</p>
              </div>
            )}

            <div className="self-center flex gap-(--space-1) min-w-0">
              {isCompleted ? (
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM7.54347 11.424L12.1493 5.66613L11.3173 5.00053L7.38987 9.90827L4.608 7.5904L3.92533 8.4096L7.54347 11.424Z"
                      fill="#10B981"
                    />
                  </svg>

                  <p className="text-green-500">Completed</p>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <img
                    src={calander}
                    className="min-w-0 w-5"
                    alt="Calendar Icon"
                  />
                  <p>{formatDueDate(dueDate)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* taskMenu */}
        <div className="relative ml-auto">
          <img
            src={taskMenu}
            alt="Task Menu"
            onClick={() => setOpenMenu(!openMenu)}
            className="ml-auto self-start cursor-pointer min-w-fit"
          />

          {openMenu && (
            <div className="absolute right-0 mt-2 bg-amber-200">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
