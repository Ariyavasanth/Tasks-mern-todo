export const getBorderColor = (status) => {
  const colors = {
    Completed: "border-l-status-completed",
    Work: "border-l-status-work",
    Personal: "border-l-status-personal",
    Urgent: "border-l-status-urgent",
  };

  return colors[status] || "border-l-gray-300";
};
