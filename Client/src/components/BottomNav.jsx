import NavItem from "./NavItem";
// import "./fab-btn.css";
const BottomNav = ({ onAddClick }) => {
  

  return (
    <div className="fixed bottom-0 left-0 w-full h-[65px] bg-white border-t flex justify-around items-center z-30">
      {/* Home */}
      <NavItem label="Home">
        <svg
          className="mb-1 fill-home-default hover:fill-btn-hover"
          width="27"
          height="23"
          viewBox="0 0 27 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.6667 22.6667V14.6667H16V22.6667H22.6667V12H26.6667L13.3333 0L0 12H4V22.6667H10.6667Z" />
        </svg>
      </NavItem>

      {/* Spacer for FAB */}
      <div className="w-[60px] " />

      {/* Profile */}
      <NavItem label="Profile">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-home-default hover:fill-btn-hover"
        >
          <path d="M27.2088 21.7956C25.7805 20.248 24.0472 19.013 22.1181 18.1683C20.189 17.3236 18.1058 16.8875 15.9999 16.8875C13.894 16.8875 11.8108 17.3236 9.88172 18.1683C7.95261 19.013 6.21932 20.248 4.791 21.7956C4.56976 22.039 4.4463 22.3555 4.44434 22.6844V28.0178C4.44901 28.3683 4.59155 28.7029 4.84109 28.9491C5.09063 29.1953 5.42711 29.3334 5.77767 29.3333H26.2221C26.5757 29.3333 26.9149 29.1929 27.1649 28.9428C27.415 28.6928 27.5554 28.3536 27.5554 28V22.6667C27.5492 22.3439 27.426 22.0344 27.2088 21.7956Z" />
          <path d="M16.0001 15.1111C19.4365 15.1111 22.2223 12.3253 22.2223 8.88891C22.2223 5.45247 19.4365 2.66669 16.0001 2.66669C12.5636 2.66669 9.77783 5.45247 9.77783 8.88891C9.77783 12.3253 12.5636 15.1111 16.0001 15.1111Z" />
        </svg>
      </NavItem>

      {/* Floating Action Button */}
      <button
        onClick={onAddClick}
        className="fab-btn absolute -top-8 left-1/2 -translate-x-1/2 w-(--space-13) h-(--space-13) rounded-full bg-brand-primary pointer text-white text-h4 flex items-center justify-center shadow-lg active:bg-btn-active hover:bg-btn-hover"
      >
        +
      </button>
    </div>
  );
};

export default BottomNav;
