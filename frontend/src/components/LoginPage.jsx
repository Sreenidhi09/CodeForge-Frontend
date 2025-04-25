import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useUserContext } from "../context/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added for signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      if (isRegister) {
        const result = await signup(email, password, name);
        if (!result.success) throw new Error(result.error);
        alert("Check your email to confirm your account!");
      } else {
        if (!isVerified && !showVerification) {
          const res = await fetch('http://localhost:5001/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
  
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to send code");
          
          setShowVerification(true);
          setLoading(false);
          return;
        }
  
        if (showVerification && !isVerified) {
          await verifyCode();
          return;
        }
  
        const result = await login(email, password);
        if (!result.success) throw new Error(result.error);
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };
  


  const verifyCode = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
  
      setIsVerified(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  


  const resetVerification = () => {
    setShowVerification(false);
    setIsVerified(false);
    setVerificationCode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-zinc-700/50">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {isRegister ? "Create an Account" : "Log In to CodeForge"}
        </h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
                required={isRegister}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
              required
              disabled={showVerification}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
              required
              disabled={showVerification}
            />
          </div>
          
          {showVerification && !isVerified && (
            <div className="mb-6">
              <label htmlFor="verificationCode" className="block text-gray-300 mb-2">
                Verification Code (4 digits)
              </label>
              <input
                id="verificationCode"
                type="text"
                maxLength={4}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
                placeholder="Enter 4-digit code"
                required
              />
              <p className="mt-2 text-sm text-gray-400">
                Enter the 4-digit verification code sent to your email
              </p>
            </div>
          )}

          {showVerification && isVerified && (
            <div className="mb-6 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded">
              Verification successful! You can now sign in.
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loading 
              ? "Loading..." 
              : isRegister 
                ? "Sign Up" 
                : showVerification && !isVerified 
                  ? "Verify Code" 
                  : "Sign In"}
          </button>

          {showVerification && (
            <button
              type="button"
              onClick={resetVerification}
              className="w-full mt-3 bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors"
            >
              Back to Login
            </button>
          )}
        </form>
        
        {!showVerification && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              {isRegister ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;