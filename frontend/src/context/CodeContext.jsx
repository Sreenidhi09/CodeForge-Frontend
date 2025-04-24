import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const CodeContext = createContext();

// Custom hook to use the CodeContext
export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCodeContext must be used within a CodeProvider');
  }
  return context;
};

// Provider component
export const CodeProvider = ({ children }) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate a new question
  const generateNewQuestion = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would fetch from your API
      // For now, we'll simulate with a mock question
      
      const mockQuestion = {
        id: Math.floor(Math.random() * 1000),
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        input_format: "First line contains the array of integers. Second line contains the target sum.",
        output_format: "Return the indices of the two numbers that add up to the target.",
        test_cases: [
          {
            input: "[2,7,11,15]\n9",
            output: "[0,1]"
          },
          {
            input: "[3,2,4]\n6",
            output: "[1,2]"
          }
        ],
        testcases: [
          {
            input: "[2,7,11,15]\n9",
            output: "[0,1]"
          },
          {
            input: "[3,2,4]\n6",
            output: "[1,2]"
          }
        ],
        hint: "Consider using a hash map to store values you've seen and their indices."
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQuestion(mockQuestion);
      return mockQuestion;
    } catch (err) {
      setError("Failed to load question");
      console.error("Error loading question:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load initial question
  useEffect(() => {
    generateNewQuestion();
  }, []);

  const value = {
    question,
    setQuestion,
    loading,
    error,
    generateNewQuestion
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};