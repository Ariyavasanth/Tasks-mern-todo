const NavItem = ({ children, label }) => (
  <div className="flex flex-col items-center text-sm text-gray-600">
    {children}
    <span>{label}</span>
  </div>
);

export default NavItem;
