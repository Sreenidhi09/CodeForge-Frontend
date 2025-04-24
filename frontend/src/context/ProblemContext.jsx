import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Create context
const ProblemContext = createContext();

// Custom hook to use the context
export const useProblemContext = () => useContext(ProblemContext);

// Provider component
export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch problems and user progress from database
  useEffect(() => {
    const fetchProblemsAndProgress = async () => {
      try {
        setLoading(true);

        // Sample data - in a real app, this would come from Supabase
        const problemsData = [
          {
            id: 1,
            title: "Two Sum",
            category: "arrays",
            difficulty: "easy",
            description: "Find two numbers in an array that add up to a specific target."
          },
          {
            id: 2,
            title: "Reverse Linked List",
            category: "linked-lists",
            difficulty: "easy",
            description: "Reverse a singly linked list."
          },
          {
            id: 3,
            title: "Binary Tree Level Order Traversal",
            category: "trees",
            difficulty: "medium",
            description: "Return the level order traversal of a binary tree's values."
          },
          {
            id: 4,
            title: "Merge K Sorted Lists",
            category: "linked-lists",
            difficulty: "hard",
            description: "Merge k sorted linked lists into one sorted linked list."
          },
          {
            id: 5,
            title: "Maximum Subarray",
            category: "arrays",
            difficulty: "medium",
            description: "Find the contiguous subarray with the largest sum."
          }
        ];

        const progressData = {
          1: { completed: true, attempts: 2 },
          5: { completed: true, attempts: 1 }
        };

        setProblems(problemsData);
        setUserProgress(progressData);
      } catch (err) {
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemsAndProgress();
  }, []);

  // Filter problems based on selected criteria
  const filteredProblems = problems.filter(problem => {
    return (selectedDifficulty === "all" || problem.difficulty === selectedDifficulty) &&
           (selectedCategory === "all" || problem.category === selectedCategory);
  });

  // Map problems with user progress
  const enhancedProblems = filteredProblems.map(problem => ({
    ...problem,
    completed: userProgress[problem.id]?.completed || false,
    attempts: userProgress[problem.id]?.attempts || 0
  }));

  // Get available categories from problems
  const categories = [...new Set(problems.map(p => p.category))];

  return (
    <ProblemContext.Provider value={{
      problems: enhancedProblems,
      categories,
      selectedDifficulty,
      setSelectedDifficulty,
      selectedCategory,
      setSelectedCategory,
      loading
    }}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemProvider;