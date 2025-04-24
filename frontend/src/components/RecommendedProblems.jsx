import React from 'react';
import { useUserDataContext } from '../context/UserDataContext';

const RecommendedProblems = () => {
  const { userData } = useUserDataContext();
  const recommendedProblems = userData?.recommendedProblems || [
    { id: 1, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", matchScore: 95 },
    { id: 2, title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", matchScore: 90 },
    { id: 3, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", matchScore: 85 }
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Recommended Problems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedProblems.map((problem) => (
          <div 
            key={problem.id}
            className="p-4 rounded-xl shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition duration-300 bg-zinc-800"
          >
            <h3 className="font-bold text-lg text-white mb-2">{problem.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-gray-300">
                {problem.topic}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                problem.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                problem.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Match score</span>
              <span className="text-emerald-400 font-bold">{problem.matchScore}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProblems;