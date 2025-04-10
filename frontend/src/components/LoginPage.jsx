// src/components/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavLink from "./ui/MainNavLink";
import UserNavLink from "./ui/UserNavLink";
import TopicCard from "./ui/TopicCard";
import FeaturedCard from "./ui/FeaturedCard";
import Dashboard from "./Dashboard";

function HomePage({ initialActiveTab = "home" }) {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const navigate = useNavigate();
  
  // Update activeTab when initialActiveTab changes
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  
  // Update navigation to use router
  const handleTabChange = (tab) => {
    navigate(`/${tab === "home" ? "home" : tab}`);
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
            <MainNavLink active={activeTab === "home"} onClick={() => handleTabChange("home")}>Home</MainNavLink>
            <MainNavLink active={activeTab === "dashboard"} onClick={() => handleTabChange("dashboard")}>Dashboard</MainNavLink>
            <MainNavLink active={activeTab === "practice"} onClick={() => handleTabChange("practice")}>Practice</MainNavLink>
            <MainNavLink active={activeTab === "contests"} onClick={() => handleTabChange("contests")}>Contests</MainNavLink>
            <MainNavLink active={activeTab === "about"} onClick={() => handleTabChange("about")}>About</MainNavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5">
            <UserNavLink active={activeTab === "profile"} onClick={() => handleTabChange("profile")}>
              <span className="text-lg">👤</span>
              Profile
            </UserNavLink>
            <UserNavLink active={activeTab === "settings"} onClick={() => handleTabChange("settings")}>
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
            CF
          </button>
        </div>
      </nav>
      
      {/* Content for Home tab */}
      {activeTab === "home" && (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <section className="text-center mb-10">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-violet-500 to-emerald-500 text-transparent bg-clip-text">
              Master DSA Like a Superhuman
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Elevate your algorithmic thinking and problem-solving skills with our interactive learning platform designed for high performance.
            </p>
          </section>
          
          {/* Featured Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Topics</h2>
              <a href="#" className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center gap-1">
                View all topics <span>→</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Featured cards */}
              <FeaturedCard 
                icon="🚀" 
                title="Getting Started with DSA" 
                color="from-blue-500 to-violet-500"
              />
              <FeaturedCard 
                icon="🏆" 
                title="Competitive Programming" 
                color="from-purple-500 to-pink-500"
              />
              <FeaturedCard 
                icon="💼" 
                title="Interview Preparation" 
                color="from-orange-500 to-red-500"
              />
              <FeaturedCard 
                icon="🧠" 
                title="System Design" 
                color="from-emerald-500 to-teal-500"
              />
            </div>
          </section>
          
          {/* Topic Categories */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Core DSA Topics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <TopicCard 
                icon="📊" 
                title="Arrays & Strings" 
                description="Master fundamental data structures with hands-on examples" 
              />
              <TopicCard 
                icon="🔄" 
                title="Linked Lists" 
                description="Learn to manipulate pointers and traverse nodes efficiently" 
              />
              <TopicCard 
                icon="🌳" 
                title="Trees & Graphs" 
                description="Explore hierarchical and networked structures" 
              />
              <TopicCard 
                icon="⚡" 
                title="Dynamic Programming" 
                description="Optimize solutions with memoization techniques" 
              />
              <TopicCard 
                icon="🔍" 
                title="Searching Algorithms" 
                description="Find elements efficiently using proven techniques" 
              />
              <TopicCard 
                icon="📋" 
                title="Sorting Techniques" 
                description="Compare and implement various sorting algorithms" 
              />
              <TopicCard 
                icon="🧩" 
                title="Recursion & Backtracking" 
                description="Master recursive problem-solving approaches" 
              />
              <TopicCard 
                icon="⚖" 
                title="Greedy Algorithms" 
                description="Optimize solutions using incremental approach" 
              />
            </div>
          </section>
        </main>
      )}
      
      {/* Content for Dashboard tab */}
      {activeTab === "dashboard" && <Dashboard />}
      
      {/* Content for About tab */}
      {activeTab === "about" && (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">About CodeForge</h1>
          
          <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700/50 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At CodeForge, we believe that mastering data structures and algorithms should be accessible to everyone. 
              Our platform is designed to provide a structured learning path for developers of all levels, from beginners 
              to advanced coders preparing for technical interviews at top tech companies.
            </p>
            <p className="text-gray-300">
              We're committed to creating an engaging, interactive experience that makes learning DSA not just effective, 
              but also enjoyable. Our team consists of experienced developers, educators, and competitive programmers who 
              are passionate about helping others succeed in their coding journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700/50 text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h2 className="text-xl font-bold mb-2">Community Focused</h2>
              <p className="text-gray-400">Learn together with our supportive community of coders</p>
            </div>
            
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700/50 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-xl font-bold mb-2">Structured Learning</h2>
              <p className="text-gray-400">Follow a clear path to mastery with our curated content</p>
            </div>
            
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700/50 text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h2 className="text-xl font-bold mb-2">Regular Updates</h2>
              <p className="text-gray-400">Stay current with continuously updated materials and challenges</p>
            </div>
          </div>
          
          <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700/50">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex items-center gap-2 text-violet-400">
              <span>✉</span> contact@codeforge.io
            </div>
          </div>
        </main>
      )}
      
      {/* Content for Settings tab */}
      {activeTab === "settings" && (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 overflow-hidden">
            <div className="p-6 border-b border-zinc-700/50">
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-md p-3 text-white focus:outline-none focus:border-violet-500" 
                    defaultValue="CodeForge User"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-md p-3 text-white focus:outline-none focus:border-violet-500" 
                    defaultValue="user@example.com"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-zinc-700/50">
              <h2 className="text-xl font-bold mb-4">Appearance</h2>
              
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <div className="w-12 h-6 bg-violet-600 rounded-full relative">
                  <div className="absolute right-1 top-1 bg-white rounded-full w-4 h-4"></div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-zinc-700/50">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <div className="w-12 h-6 bg-violet-600 rounded-full relative">
                    <div className="absolute right-1 top-1 bg-white rounded-full w-4 h-4"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
                    <div className="absolute left-1 top-1 bg-white rounded-full w-4 h-4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      )}
      
      {/* Profile content */}
      {activeTab === "profile" && (
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6">User Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-8 flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 flex items-center justify-center text-4xl font-bold text-white mb-4">
                CF
              </div>
              <h2 className="text-xl font-bold mb-1">CodeForge User</h2>
              <p className="text-gray-400 mb-4">user@example.com</p>
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">
                  Intermediate
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                  Python
                </span>
              </div>
              <button className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm font-medium transition-colors">
                Edit Profile
              </button>
            </div>
            
            {/* Stats and Activity */}
            <div className="md:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-4 text-center">
                  <div className="text-3xl font-bold text-violet-400 mb-1">42</div>
                  <div className="text-sm text-gray-400">Problems Solved</div>
                </div>
                <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">7</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
                <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">3</div>
                  <div className="text-sm text-gray-400">Badges Earned</div>
                </div>
                <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">820</div>
                  <div className="text-sm text-gray-400">Total Points</div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 p-6">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-zinc-700/50">
                    <div className="text-green-400 text-lg mt-0.5">✓</div>
                    <div>
                      <div className="font-medium">Solved "Binary Search Implementation"</div>
                      <div className="text-sm text-gray-400">Yesterday at 3:45 PM</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b border-zinc-700/50">
                    <div className="text-amber-400 text-lg mt-0.5">🏆</div>
                    <div>
                      <div className="font-medium">Earned "Algorithm Master" badge</div>
                      <div className="text-sm text-gray-400">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b border-zinc-700/50">
                    <div className="text-violet-400 text-lg mt-0.5">🔄</div>
                    <div>
                      <div className="font-medium">Submitted solution for "Merge Sort"</div>
                      <div className="text-sm text-gray-400">3 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 text-lg mt-0.5">📚</div>
                    <div>
                      <div className="font-medium">Started "Dynamic Programming" course</div>
                      <div className="text-sm text-gray-400">5 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      
      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-violet-500">CodeForge</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm">Help</a>
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm">Contact</a>
          </div>
          
          <div className="text-gray-500 text-sm mt-4 md:mt-0">
            © 2025 CodeForge
          </div>
        </div>
      </footer>
      
      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-xl p-8 w-full max-w-md shadow-2xl relative">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-violet-500 mb-2">Welcome Back</h2>
              <p className="text-gray-400">Login to continue your learning journey</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setShowModal(false);
              alert("Login successful! Redirecting to dashboard...");
            }}>
              <div className="mb-6">
                <label htmlFor="modal-email" className="block mb-2 text-sm text-gray-400">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="modal-email" 
                  className="w-full p-3 rounded-md border border-zinc-700 bg-zinc-900/50 text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
                  placeholder="your@email.com" 
                  required 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="modal-password" className="block mb-2 text-sm text-gray-400">
                  Password
                </label>
                <input 
                  type="password" 
                  id="modal-password" 
                  className="w-full p-3 rounded-md border border-zinc-700 bg-zinc-900/50 text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
                  placeholder="Enter your password" 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 rounded-md bg-violet-600 hover:bg-violet-700 text-white font-semibold transition shadow-lg hover:shadow-violet-500/25"
              >
                Login
              </button>
              
              <div className="flex justify-between mt-4 text-sm">
                <a href="#" className="text-violet-400 hover:underline">Forgot password?</a>
                <a href="#" className="text-violet-400 hover:underline">Create account</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;