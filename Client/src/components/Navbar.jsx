import React from "react";
import Lottie from "lottie-react";
import { Search } from "lucide-react";
const Navbar = () => {
  return (
   
      <nav className="flex items-center justify-between  p-4 bg-white">
        <div className="text-brand-primary  text-3xl color-surface-primary font-bold">
          Tasks
        </div>
        <Search className="text-search-icon" />
      </nav>
  );
};

export default Navbar;
