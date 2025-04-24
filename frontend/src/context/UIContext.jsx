import React, { createContext, useContext, useState } from 'react';

// Create the context
const UIContext = createContext();

// Custom hook to use the UIContext
export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

// Provider component
export const UIProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false
  });

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Toggle notification settings
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const value = {
    activeTab,
    setActiveTab,
    showModal,
    setShowModal,
    theme,
    toggleTheme,
    notifications,
    toggleNotification
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};