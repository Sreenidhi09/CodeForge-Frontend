import React from 'react';
import BadgeWithProgress from './BadgeWithProgress';
import History from './History';

const Dashboard = () => {
  const username = "User";
  const topics = [
    { name: 'Arrays', xp: 85 },
    { name: 'Strings', xp: 35 },
    { name: 'Graphs', xp: 60 },
  ];

  /*return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold mr-4">
            {username.charAt(0)}
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {username}!</h1>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition duration-300 bg-white"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{topic.name}</h3>
                <BadgeWithProgress xp={topic.xp} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <History />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">
              <h3 className="font-medium text-purple-600">Maximum Subarray</h3>
              <p className="text-sm text-gray-600">Difficulty: Medium</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer">
              <h3 className="font-medium text-purple-600">Merge Intervals</h3>
              <p className="text-sm text-gray-600">Difficulty: Medium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;*/
return (
  <main className="flex-1 p-8 max-w-7xl mx-auto w-full bg-navy-900">
    <div className="flex items-center mb-8">
      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mr-4">
        {username.charAt(0)}
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
            className="p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition duration-300 bg-navy-800"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{topic.name}</h3>
            <BadgeWithProgress xp={topic.xp} />
          </div>
        ))}
      </div>
    </div>
    
    {/* Problem History Section */}
    <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 mb-8">
      <History />
    </div>
    
    {/* Recommended Problems */}
    <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
      <h2 className="text-2xl font-bold text-white mb-6">Recommended Problems</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-navy-700 rounded-lg p-4 hover:bg-navy-700 transition cursor-pointer">
          <h3 className="font-medium text-blue-300">Maximum Subarray</h3>
          <p className="text-sm text-gray-400">Difficulty: Medium</p>
        </div>
        <div className="border border-navy-700 rounded-lg p-4 hover:bg-navy-700 transition cursor-pointer">
          <h3 className="font-medium text-blue-300">Merge Intervals</h3>
          <p className="text-sm text-gray-400">Difficulty: Medium</p>
        </div>
      </div>
    </div>
  </main>
);
};

export default Dashboard;