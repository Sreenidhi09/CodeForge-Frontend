import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const fakeHistory = [
    { title: 'Two Sum', topic: 'Arrays', status: 'Completed' },
    { title: 'Valid Palindrome', topic: 'Strings', status: 'Attempted' },
    { title: 'Graph Traversal', topic: 'Graphs', status: 'Completed' },
  ];

  /*return (
    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl w-full max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Problem History</h2>
      <div className="hidden md:flex justify-between px-4 text-lg font-semibold text-gray-700 mb-2">
        <div className="w-1/3 text-center">Title</div>
        <div className="w-1/3 text-center">Topic</div>
        <div className="w-1/3 text-center">Status</div>
      </div>
      <div className="space-y-4">
        {fakeHistory.map((problem, index) => (
          <div
            key={index}
            className="p-4 rounded-xl shadow-md border-l-4 border-gray-500 hover:shadow-lg transition duration-300 backdrop-blur-sm bg-white/30"
          >
            <div className="flex flex-col md:flex-row md:items-center text-center justify-between">
              <Link
                to={`/solution/${encodeURIComponent(problem.title)}`}
                className="w-full md:w-1/3 text-lg font-semibold text-gray-600 hover:underline"
              >
                {problem.title}
              </Link>
              <p className="w-full md:w-1/3 text-sm text-gray-600">
                {problem.topic}
              </p>
              <p className="w-full md:w-1/3 text-sm text-gray-600">
                <span
                  className={`font-semibold ${
                    problem.status === 'Completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {problem.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;*/
return (
  <div className="w-full">
    <h2 className="text-2xl font-bold mb-6 text-white">Problem History</h2>
    <div className="hidden md:flex justify-between px-4 text-lg font-semibold text-gray-400 mb-2">
      <div className="w-1/3 text-center">Title</div>
      <div className="w-1/3 text-center">Topic</div>
      <div className="w-1/3 text-center">Status</div>
    </div>
    <div className="space-y-4">
      {fakeHistory.map((problem, index) => (
        <div
          key={index}
          className="p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition duration-300 bg-navy-800"
        >
          <div className="flex flex-col md:flex-row md:items-center text-center justify-between">
            <Link
              to={`/solution/${encodeURIComponent(problem.title)}`}
              className="w-full md:w-1/3 text-lg font-semibold text-blue-300 hover:underline"
            >
              {problem.title}
            </Link>
            <p className="w-full md:w-1/3 text-sm text-gray-300">
              {problem.topic}
            </p>
            <p className="w-full md:w-1/3 text-sm">
              <span
                className={`font-semibold ${
                  problem.status === 'Completed'
                    ? 'text-green-400'
                    : 'text-yellow-400'
                }`}
              >
                {problem.status}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
export default History;