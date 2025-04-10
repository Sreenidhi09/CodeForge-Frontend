function UserNavLink({ children, active, onClick }) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center gap-1.5 text-sm font-medium ${active ? 'text-violet-500' : 'text-gray-400 hover:text-gray-200'} transition-colors`}
      >
        {children}
      </button>
    );
  }
  
  export default UserNavLink;