export const formatDueDate = (dueDate) => {
  if (!dueDate) return "Today";

  const today = new Date();
  const due = new Date(dueDate);

  // Remove time part for accurate comparison
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  // Indian date format
  return due.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
