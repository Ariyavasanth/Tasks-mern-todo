import React from "react";

const FilterButton = ({ text, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`mt-(--space-6) shrink-0 cursor-pointer inline-block 
      px-(--space-5) py-(--space-3) font-medium 
      rounded-(--radius-xxl) transition-all duration-200
      ${
        isActive
          ? "bg-brand-primary text-white shadow-md"
          : "bg-white text-black hover:bg-btn-hover hover:text-white"
      }`}
    >
      {text}
    </button>
  );
};

export default FilterButton;
// className=" shrink-0  cursor-pointer  bg-white hover:bg-btn-hover hover:text-white text-black inline-block px-(--space-5) font-medium py-(--space-3)  rounded-(--radius-xxl)