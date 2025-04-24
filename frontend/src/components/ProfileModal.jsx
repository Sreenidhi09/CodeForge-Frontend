import React from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigationContext } from '../context/NavigationContext';

function ProfileModal({ onClose }) {
  const { user } = useUserContext();
  const { goToProfile, goToSettings, handleLogout } = useNavigationContext();
  
  const handleNavigation = (navigationFunction) => {
    onClose();
    navigationFunction();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-xl p-8 w-full max-w-md shadow-2xl relative">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{user?.email?.split('@')[0]}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleNavigation(goToProfile)}
            className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white text-left px-4 transition"
          >
            View Profile
          </button>
          
          <button 
            onClick={() => handleNavigation(goToSettings)}
            className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white text-left px-4 transition"
          >
            Settings
          </button>
          
          <button 
            onClick={() => {
              onClose();
              handleLogout();
            }}
            className="w-full py-2 rounded-md bg-red-600/30 hover:bg-red-600/50 text-red-300 text-left px-4 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;