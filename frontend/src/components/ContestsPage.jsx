import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUserContext } from "../context/UserContext";
import { useNavigationContext } from "../context/NavigationContext";
import { useUIContext } from "../context/UIContext";
import MainNavbar from "./MainNavbar";

function ContestsPage() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const { setActiveTab } = useNavigationContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    setActiveTab("contests");
    fetchContests();
  }, [setActiveTab]);
  
  const fetchContests = async () => {
    try {
      setLoading(true);
      // Replace with your actual Supabase query to fetch contests
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .order('start_date', { ascending: true });
        
      if (error) throw error;
      setContests(data || []);
    } catch (error) {
      console.error("Error fetching contests:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const joinContest = async (contestId) => {
    try {
      // Logic to register user for contest
      const { error } = await supabase
        .from('contest_participants')
        .insert({ user_id: user.id, contest_id: contestId });
        
      if (error) throw error;
      
      // Refresh contests to update UI
      fetchContests();
    } catch (error) {
      console.error("Error joining contest:", error);
    }
  };
  
  const goToContest = (contestId) => {
    navigate(`/contest/${contestId}`);
  };
  
  // Helper to determine if a contest is upcoming, active, or completed
  const getContestStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return "upcoming"; 
    if (now >= start && now <= end) return "active";
    return "completed";
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-gray-200">
      <MainNavbar />
      
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-8">Coding Contests</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Contests */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-violet-400 mb-4">Active Contests</h2>
              {contests.filter(c => getContestStatus(c.start_date, c.end_date) === "active").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contests
                    .filter(contest => getContestStatus(contest.start_date, contest.end_date) === "active")
                    .map(contest => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        status="active"
                        onJoin={() => joinContest(contest.id)}
                        onEnter={() => goToContest(contest.id)}
                      />
                    ))
                  }
                </div>
              ) : (
                <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400">No active contests right now.</p>
                  <p className="text-violet-400 mt-2">Check back soon or join an upcoming contest!</p>
                </div>
              )}
            </div>
            
            {/* Upcoming Contests */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Upcoming Contests</h2>
              {contests.filter(c => getContestStatus(c.start_date, c.end_date) === "upcoming").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contests
                    .filter(contest => getContestStatus(contest.start_date, contest.end_date) === "upcoming")
                    .map(contest => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        status="upcoming"
                        onJoin={() => joinContest(contest.id)}
                      />
                    ))
                  }
                </div>
              ) : (
                <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400">No upcoming contests scheduled.</p>
                </div>
              )}
            </div>
            
            {/* Past Contests */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-400 mb-4">Past Contests</h2>
              {contests.filter(c => getContestStatus(c.start_date, c.end_date) === "completed").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contests
                    .filter(contest => getContestStatus(contest.start_date, contest.end_date) === "completed")
                    .slice(0, 6) // Show only the 6 most recent past contests
                    .map(contest => (
                      <ContestCard 
                        key={contest.id}
                        contest={contest}
                        status="completed"
                        onView={() => goToContest(contest.id)}
                      />
                    ))
                  }
                </div>
              ) : (
                <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400">No past contests yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Contest Card Component
function ContestCard({ contest, status, onJoin, onEnter, onView }) {
  // Format date nicely
  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate time remaining or time elapsed
  const getTimeDisplay = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (status === "upcoming") {
      const diffMs = start - now;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (diffDays > 0) {
        return `Starts in ${diffDays}d ${diffHrs}h`;
      }
      return `Starts in ${diffHrs}h`;
    }
    
    if (status === "active") {
      const diffMs = end - now;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      return `Ends in ${diffHrs}h ${diffMins}m`;
    }
    
    return `Ended ${formatDate(endDate)}`;
  };
  
  // Card styles based on status
  const getCardStyles = () => {
    switch(status) {
      case "active":
        return "border-violet-500 bg-gradient-to-b from-zinc-800 to-zinc-900";
      case "upcoming":
        return "border-emerald-500 bg-gradient-to-b from-zinc-800 to-zinc-900";
      case "completed":
      default:
        return "border-gray-700 bg-zinc-800/50";
    }
  };
  
  return (
    <div className={`rounded-lg border p-5 flex flex-col ${getCardStyles()}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{contest.title}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === "active" ? "bg-violet-500/20 text-violet-300" : 
          status === "upcoming" ? "bg-emerald-500/20 text-emerald-300" : 
          "bg-gray-700/20 text-gray-400"
        }`}>
          {status === "active" ? "Active" : status === "upcoming" ? "Upcoming" : "Completed"}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-3">{contest.description}</p>
      
      <div className="text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🕒</span>
          <span>{getTimeDisplay(contest.start_date, contest.end_date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">👥</span>
          <span>{contest.participant_count || 0} participants</span>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex gap-3">
        {status === "active" && (
          <button 
            onClick={onEnter}
            className="flex-1 py-2 px-4 bg-violet-600 hover:bg-violet-700 rounded-md font-medium text-white transition-colors"
          >
            Enter Contest
          </button>
        )}
        
        {status === "upcoming" && (
          <button 
            onClick={onJoin}
            className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-md font-medium text-white transition-colors"
          >
            Register
          </button>
        )}
        
        {status === "completed" && (
          <button 
            onClick={onView}
            className="flex-1 py-2 px-4 bg-zinc-700 hover:bg-zinc-600 rounded-md font-medium text-white transition-colors"
          >
            View Results
          </button>
        )}
      </div>
    </div>
  );
}

export default ContestsPage;