function MainNavLink({ children, active, onClick }) {
    return (
      <button 
        onClick={onClick}
        className={`text-sm font-medium ${active ? 'text-violet-500' : 'text-gray-400 hover:text-gray-200'} transition-colors`}
      >
        {children}
      </button>
    );
  }
  
  export default MainNavLink;