import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainNavLink from './components/shared/MainNavLink';
import UserNavLink from './components/shared/UserNavLink';
import FeaturedCard from './components/shared/FeaturedCard';
import TopicCard from './components/shared/TopicCard';
import PracticePage from './components/practice/PracticePage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function CodeForgeDSA() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  
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
            <MainNavLink active={activeTab === "home"} onClick={() => setActiveTab("home")}>Home</MainNavLink>
            <MainNavLink active={activeTab === "dashboard"} onClick={() => navigate("/dashboard")}>Dashboard</MainNavLink>
            <MainNavLink active={activeTab === "practice"} onClick={() => setActiveTab("practice")}>Practice</MainNavLink>
            <MainNavLink active={activeTab === "contests"} onClick={() => setActiveTab("contests")}>Contests</MainNavLink>
            <MainNavLink active={activeTab === "about"} onClick={() => setActiveTab("about")}>About</MainNavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5">
            <UserNavLink active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
              <span className="text-lg">👤</span>
              Profile
            </UserNavLink>
            <UserNavLink active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
              <span className="text-lg">⚙</span>
              Settings
            </UserNavLink>
            <UserNavLink onClick={handleLogout}>
              <span className="text-lg">🚪</span>
              Logout
            </UserNavLink>
          </div>
          <button 
            onClick={() => setActiveTab("profile")}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20"
          >
            CF
          </button>
        </div>
      </nav>
      
      {/* Content */}
      {activeTab === "home" && (
        // Home content
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          {/* ...rest of home content... */}
        </main>
      )}
      
      {activeTab === "practice" && <PracticePage />}
      
      {/* ...other tabs... */}
      
      <Footer />
    </div>
  );
}

export default CodeForgeDSA;