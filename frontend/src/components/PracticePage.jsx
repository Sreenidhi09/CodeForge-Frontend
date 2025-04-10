import { useState } from "react";
import MainNavLink from "./ui/MainNavLink";
import UserNavLink from "./ui/UserNavLink";

function PracticePage() {
  const [activeTab, setActiveTab] = useState("practice");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      category: "arrays",
      difficulty: "easy",
      completed: true,
      description: "Find two numbers in an array that add up to a specific target."
    },
    {
      id: 2,
      title: "Reverse Linked List",
      category: "linked-lists",
      difficulty: "easy",
      completed: false,
      description: "Reverse a singly linked list."
    },
    {
      id: 3,
      title: "Binary Tree Level Order Traversal",
      category: "trees",
      difficulty: "medium",
      completed: false,
      description: "Return the level order traversal of a binary tree's values."
    },
    {
      id: 4,
      title: "Merge K Sorted Lists",
      category: "linked-lists",
      difficulty: "hard",
      completed: false,
      description: "Merge k sorted linked lists into one sorted linked list."
    },
    {
      id: 5,
      title: "Maximum Subarray",
      category: "arrays",
      difficulty: "medium",
      completed: true,
      description: "Find the contiguous subarray with the largest sum."
    }
  ];
  
  const filteredProblems = problems.filter(problem => {
    return (selectedDifficulty === "all" || problem.difficulty === selectedDifficulty) &&
           (selectedCategory === "all" || problem.category === selectedCategory);
  });
  
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
            <MainNavLink active={activeTab === "home"} onClick={() => navigate("/home")}>Home</MainNavLink>
            <MainNavLink active={activeTab === "dashboard"} onClick={() => navigate("/dashboard")}>Dashboard</MainNavLink>
            <MainNavLink active={activeTab === "practice"} onClick={() => setActiveTab("practice")}>Practice</MainNavLink>
            <MainNavLink active={activeTab === "contests"} onClick={() => setActiveTab("contests")}>Contests</MainNavLink>
            <MainNavLink active={activeTab === "about"} onClick={() => navigate("/about")}>About</MainNavLink>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-5">
            <UserNavLink active={activeTab === "profile"} onClick={() => navigate("/profile")}>
              <span className="text-lg">👤</span>
              Profile
            </UserNavLink>
            <UserNavLink active={activeTab === "settings"} onClick={() => navigate("/settings")}>
              <span className="text-lg">⚙</span>
              Settings
            </UserNavLink>
            <UserNavLink onClick={handleLogout}>
              <span className="text-lg">🚪</span>
              Logout
            </UserNavLink>
          </div>
          <button className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20">
            CF
          </button>
        </div>
      </nav>
      
      {/* Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="bg-zinc-800 rounded-lg p-1 flex">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedDifficulty === 'all' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedDifficulty === 'easy' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedDifficulty === 'medium' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedDifficulty === 'hard' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedDifficulty('hard')}
            >
              Hard
            </button>
          </div>
          
          <div className="bg-zinc-800 rounded-lg p-1 flex">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'all' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Topics
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'arrays' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedCategory('arrays')}
            >
              Arrays
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'linked-lists' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedCategory('linked-lists')}
            >
              Linked Lists
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${selectedCategory === 'trees' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setSelectedCategory('trees')}
            >
              Trees
            </button>
          </div>
        </div>
        
        {/* Problem List */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-900/50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Problem</th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {filteredProblems.map(problem => (
                <tr key={problem.id} className="hover:bg-zinc-700/20">
                  <td className="py-4 px-6">
                    {problem.completed ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-500">✓</span>
                    ) : (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500/20 text-gray-500">○</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{problem.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{problem.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                        problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                      {problem.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-violet-400 hover:text-violet-300 font-medium text-sm">
                      Solve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      
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
    </div>
  );
}

export default PracticePage;