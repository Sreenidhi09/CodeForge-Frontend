import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: '',
    topics: [],
    history: [],
    preferences: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false
      }
    }
  });

  // Fetch user profile data once authenticated
  const fetchUserData = async (userId) => {
    try {
      // This would typically be a database call to get user-specific data
      // For now, we'll use mock data
      const mockUserData = {
        username: user?.email?.split('@')[0] || 'User',
        topics: [
          { name: 'Arrays & Strings', xp: 75 },
          { name: 'Linked Lists', xp: 45 },
          { name: 'Trees & Graphs', xp: 30 }
        ],
        history: [
          { title: 'Two Sum', topic: 'Arrays', status: 'Completed' },
          { title: 'Linked List Cycle', topic: 'Linked Lists', status: 'Completed' },
          { title: 'Binary Tree Traversal', topic: 'Trees', status: 'In Progress' }
        ],
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            push: false
          }
        }
      };
      
      setUserData(mockUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Handle user signup
  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: name 
          }
        }
      });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update user preferences
  const updatePreferences = (newPreferences) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPreferences
      }
    }));
  };

  // Toggle notification settings
  const toggleNotification = (type) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [type]: !prev.preferences.notifications[type]
        }
      }
    }));
  };

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserData(session.user.id);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        await fetchUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const value = {
    user,
    setUser,
    loading,
    userData,
    login,
    signup,
    logout,
    updatePreferences,
    toggleNotification
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};