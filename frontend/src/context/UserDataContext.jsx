import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserDataContext = createContext();

// Create a provider component
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: "coder123",
    email: "coder123@example.com",
    topics: [
      { name: "Arrays & Strings", xp: 75 },
      { name: "Linked Lists", xp: 40 },
      { name: "Trees & Graphs", xp: 60 }
    ],
    history: [
      { title: "Two Sum", topic: "Arrays", status: "Completed" },
      { title: "Valid Parentheses", topic: "Stacks", status: "In Progress" },
      { title: "Merge Two Sorted Lists", topic: "Linked Lists", status: "Completed" }
    ],
    recommendedProblems: [
      { id: 1, title: "Binary Tree Level Order Traversal", difficulty: "Medium", topic: "Trees", matchScore: 95 },
      { id: 2, title: "Merge Intervals", difficulty: "Medium", topic: "Arrays", matchScore: 90 },
      { id: 3, title: "Course Schedule", difficulty: "Medium", topic: "Graphs", matchScore: 85 }
    ]
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the UserData context
export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserDataContext must be used within a UserDataProvider');
  }
  return context;
};