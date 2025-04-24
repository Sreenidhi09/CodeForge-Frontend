import React from "react";
import { useProblemContext } from "../context/ProblemContext";
import { useNavigationContext } from "../context/NavigationContext";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

function PracticePage() {
  const { 
    problems, 
    selectedDifficulty, 
    setSelectedDifficulty, 
    selectedCategory, 
    setSelectedCategory,
    loading 
  } = useProblemContext();
  
  const { navigate } = useNavigationContext();
  
  const handleSolveProblem = (problemId) => {
    navigate(`/codingplayground?problem=${problemId}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-white">Loading problems...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
      <MainNavbar />
      
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
              {problems.length > 0 ? (
                problems.map(problem => (
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
                      <button 
                        className="text-violet-400 hover:text-violet-300 font-medium text-sm"
                        onClick={() => handleSolveProblem(problem.id)}
                      >
                        Solve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400">
                    No problems match your selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - Optional */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-zinc-800 text-gray-400 text-sm hover:bg-zinc-700">Previous</button>
            <button className="px-3 py-1 rounded bg-violet-600 text-white text-sm">1</button>
            <button className="px-3 py-1 rounded bg-zinc-800 text-gray-400 text-sm hover:bg-zinc-700">2</button>
            <button className="px-3 py-1 rounded bg-zinc-800 text-gray-400 text-sm hover:bg-zinc-700">3</button>
            <button className="px-3 py-1 rounded bg-zinc-800 text-gray-400 text-sm hover:bg-zinc-700">Next</button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default PracticePage;