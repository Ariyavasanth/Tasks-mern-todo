import React from "react";

const FilterButton = (props) => {
  return (
    <div className="mt-(--space-6) shrink-0  cursor-pointer  bg-white hover:bg-btn-hover hover:text-white text-black inline-block px-(--space-5) font-medium py-(--space-3)  rounded-(--radius-xxl)">
      <div className="text-center">{props.text}</div>
    </div>
  );
};

export default FilterButton;
