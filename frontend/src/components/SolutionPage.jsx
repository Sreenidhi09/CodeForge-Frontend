import React from 'react';
import { useParams } from 'react-router-dom';

const SolutionPage = () => {
  const { title } = useParams();
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Solution: {decodeURIComponent(title)}</h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <p className="text-gray-700 mb-4">
          This is where the user's solution for <strong>{decodeURIComponent(title)}</strong> will appear.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="text-sm">
            <code>
              {`function solution(nums) {
  // Example solution code
  const result = [];
  // Logic would be here
  return result;
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;