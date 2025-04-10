import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import PracticePage from "./components/PracticePage";
import Dashboard from "./components/DashBoard";
import SolutionPage from "./components/SolutionPage";
import { supabase } from "./supabaseClient";
import CodingChallenge from "./components/CodingChallenge";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [question,setquestion]=useState(null)
  const [userid,setuserid]=useState(null)
  useEffect(() => {
    // Check local storage first for quick initial render
    const checkAuth = async () => {
      setLoading(true);
      
      // First quickly check localStorage
      const loggedInFromStorage = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(loggedInFromStorage);
      
      // Then verify with Supabase (more secure)
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        const isLoggedIn = !!session;
        
        // Update localStorage to match actual auth state
        if (isLoggedIn) {
          localStorage.setItem("isLoggedIn", "true");
        } else {
          localStorage.removeItem("isLoggedIn");
        }
        
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("isLoggedIn");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        localStorage.setItem("isLoggedIn", "true");
        setIsAuthenticated(true);
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("isLoggedIn");
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };

  // Auth route - redirects to home if already logged in
  const AuthRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (isAuthenticated) {
      return <Navigate to="/home" />; // Changed from "/dashboard" to "/home"
    }
    
    return children;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <HomePage onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/codingplayground"
          element={
            <ProtectedRoute>
              <CodingChallenge question={question} setquestion={setquestion} user_id={userid} setuserid={setuserid}></CodingChallenge>

            </ProtectedRoute>

          }
          />
        <Route 
          path="/practice" 
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          } 
        />
        {/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard onLogout={handleLogout} />
    </ProtectedRoute>
  } 
/>

        <Route 
          path="/solution/:id" 
          element={
            <ProtectedRoute>
              <SolutionPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;