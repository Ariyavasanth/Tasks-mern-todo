import React from "react";
import task from "../assets/task.svg";
import tick_box from "../assets/home_page/box_tick-icon.svg";

const Status = ({ totalTasks, completedTasks }) => {
  return (
    <div className="flex flex-col gap-4 mobile-base:flex-row mt-7">
      <div className="flex justify-between flex-1 px-2 py-4 bg-white rounded-lg shadow-md gap-4">
        <div>
          <p className="font-semibold text-status-text">Total Tasks</p>
          <span className="font-semibold">{totalTasks}</span>
        </div>
        <img className="w-10 h-10" src={task} />
      </div>

      <div className="flex justify-between flex-1 px-2 py-4 bg-white rounded-lg shadow-md gap-4">
        <div>
          <p className="font-semibold text-status-text">Completed</p>
          <span className="font-semibold text-green-600">
            {completedTasks}
          </span>
        </div>
        <img className="w-10 h-10" src={tick_box} />
      </div>
    </div>
  );
};

export default Status;
