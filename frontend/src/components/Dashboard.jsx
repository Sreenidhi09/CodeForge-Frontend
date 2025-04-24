import React from "react";
import MainNavLink from "./ui/MainNavLink";
import UserNavLink from "./ui/UserNavLink";
import BadgeWithProgress from './BadgeWithProgress';
import History from './History';
import RecommendedProblems from './RecommendedProblems';
import { useUserContext } from '../context/UserContext';
import { useUserDataContext } from '../context/UserDataContext';
import { useNavigationContext } from "../context/NavigationContext";
import { useUIContext } from "../context/UIContext";

// Profile Modal Component
const ProfileModal = ({ onClose }) => {
  const { user } = useUserContext();
  const { goToProfile, goToSettings, handleLogout } = useNavigationContext();
  
  const handleNavigation = (action) => {
    onClose();
    action();
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
            onClick={() => handleNavigation(handleLogout)}
            className="w-full py-2 rounded-md bg-red-600/30 hover:bg-red-600/50 text-red-300 text-left px-4 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useUserContext();
  const { userData } = useUserDataContext();
  const { topics } = userData;
  const username = user?.email?.split('@')[0] || userData.username;
  
  // Navigation context and UI context
  const { 
    activeTab,
    goToHome, 
    goToDashboard, 
    goToPractice, 
    goToContests, 
    goToAbout,
    goToProfile,
    goToSettings,
    handleLogout
  } = useNavigationContext();
  
  const { showModal, setShowModal } = useUIContext();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 px-6 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-xl font-bold text-violet-500">
            <span className="text-2xl">⚡</span>
            CodeForge
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <MainNavLink active={activeTab === "home"} onClick={goToHome}>Home</MainNavLink>
            <MainNavLink active={activeTab === "dashboard"} onClick={goToDashboard}>Dashboard</MainNavLink>
            <MainNavLink active={activeTab === "practice"} onClick={goToPractice}>Practice</MainNavLink>
            <MainNavLink active={activeTab === "contests"} onClick={goToContests}>Contests</MainNavLink>
            <MainNavLink active={activeTab === "about"} onClick={goToAbout}>About</MainNavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5">
            <UserNavLink active={activeTab === "profile"} onClick={goToProfile}>
              <span className="text-lg">👤</span>
              Profile
            </UserNavLink>
            <UserNavLink active={activeTab === "settings"} onClick={goToSettings}>
              <span className="text-lg">⚙</span>
              Settings
            </UserNavLink>
            <UserNavLink onClick={handleLogout}>
              <span className="text-lg">🚪</span>
              Logout
            </UserNavLink>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20"
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </button>
        </div>
      </nav>
      
      {/* Dashboard Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold mr-4">
            {username.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {username}!</h1>
        </div>

        {/* Topic Cards */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((topic, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl shadow-md border-l-4 border-violet-500 hover:shadow-lg transition duration-300 bg-zinc-800"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{topic.name}</h3>
                <BadgeWithProgress xp={topic.xp} />
              </div>
            ))}
          </div>
        </div>

        {/* Problem History Section */}
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 mb-8">
          <History />
        </div>

        {/* Recommended Problems */}
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <RecommendedProblems />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-violet-500">CodeForge</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} CodeForge. All rights reserved.
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <button 
              onClick={() => navigate("/privacy")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </button>
            <button 
              onClick={() => navigate("/terms")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Profile modal */}
      {showModal && <ProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;