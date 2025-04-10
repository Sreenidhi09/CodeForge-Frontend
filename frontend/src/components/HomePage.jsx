import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavLink from "./ui/MainNavLink";
import UserNavLink from "./ui/UserNavLink";
import TopicCard from "./ui/TopicCard";
import FeaturedCard from "./ui/FeaturedCard";
// Import supabase client from your centralized file
import { supabase } from "../supabaseClient";

// Placeholder Dashboard component in case it's missing
const Dashboard = () => (
  <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    <div className="bg-zinc-800 rounded-xl p-8 border border-zinc-700/50">
      <p className="text-gray-300">Your personal dashboard content will appear here.</p>
    </div>
  </main>
);

function HomePage({ initialActiveTab = "home" }) {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleplayground=()=>{
    navigate("/codingplayground")
  }
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session in HomePage:", session);
        
        if (!session) {
          // Redirect to login if no session exists
          console.log("No active session found, redirecting to login");
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
          return;
        }
        
        // Make sure local storage is set correctly
        localStorage.setItem("isLoggedIn", "true");
        
        // Set user data if session exists
        setUser(session.user);
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in HomePage:", event);
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    });
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      // Navigation will be handled by the auth listener
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-violet-500 border-r-violet-500 border-b-violet-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If authentication check is complete but no user, this is a fallback
  // (should not normally reach here due to the redirect in useEffect)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Required</h1>
          <p className="text-gray-300 mb-6">Please log in to access this page.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  
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
            {/* <MainNavLink active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>Dashboard</MainNavLink> */}
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
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
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20"
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
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
              Welcome back, {user.email}! Elevate your algorithmic thinking and problem-solving skills with our interactive learning platform.
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
              <button onClick={()=>{
                navigate("/codingplayground")
              }}>
              <TopicCard 
                icon="📊" 
                title="Arrays & Strings" 
                description="Master fundamental data structures with hands-on examples" 
              />
              </button>
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
                    defaultValue={user.email.split('@')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-md p-3 text-white focus:outline-none focus:border-violet-500" 
                    defaultValue={user.email}
                    readOnly
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
      
      {/* User Profile Modal */}
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{user.email.split('@')[0]}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => {
                  setShowModal(false);
                  setActiveTab("profile");
                }}
                className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white text-left px-4 transition"
              >
                View Profile
              </button>
              
              <button 
                onClick={() => {
                  setShowModal(false);
                  setActiveTab("settings");
                }}
                className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white text-left px-4 transition"
              >
                Settings
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full py-2 rounded-md bg-red-600/30 hover:bg-red-600/50 text-red-300 text-left px-4 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;