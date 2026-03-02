import { NavLink } from "react-router-dom";

const NavItem = ({ label, to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs`
      }
    >
      {children}
      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;