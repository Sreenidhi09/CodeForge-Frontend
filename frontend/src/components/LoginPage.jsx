import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isRegister) {
         // Sign Up logic with emailRedirectTo
         // const { data, error } = await supabase.auth.signUp({
         //   email,
         //   password,
         //   options: {
         //     emailRedirectTo: `${window.location.origin}/home`
         //   }
         const { data, error } = await supabase.auth.signUp({
           email,
           password
         });
        
        

         if (error) throw error;

         if (data) {
           alert("Check your email to confirm your account!");
         }
       } else {
         // Sign In logic
         const { data, error } = await supabase.auth.signInWithPassword({
           email,
           password
         });

         if (error) throw error;

         localStorage.setItem("isLoggedIn", "true");
         navigate("/home");
       }
     } catch (error) {
       console.error("Authentication error:", error);
       setError(error.message || "An error occurred during authentication");
     } finally {
       setLoading(false);
     }
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
             />
           </div>
          
           <button
             type="submit"
             disabled={loading}
             className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
           >
             {loading ? "Loading..." : isRegister ? "Sign Up" : "Sign In"}
           </button>
         </form>
        
         <div className="mt-4 text-center">
           <button
             onClick={() => setIsRegister(!isRegister)}
             className="text-violet-400 hover:text-violet-300 transition-colors"
           >
             {isRegister ? "Already have an account? Sign In" : "Need an account? Sign Up"}
           </button>
         </div>
       </div>
     </div>
   );
 }

 export default LoginPage;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient";
// import emailjs from "@emailjs/browser";

// // EmailJS credentials (your values)
// const EMAILJS_PUBLIC_KEY = "m7IkOBZK6_WnshJQX";
// const EMAILJS_SERVICE_ID = "service_pbzuivc";
// const EMAILJS_TEMPLATE_ID = "template_k2ospil";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isRegister, setIsRegister] = useState(false);
//   const navigate = useNavigate();

//   const sendWelcomeEmail = async (userEmail) => {
//     if (!userEmail || typeof userEmail !== "string" || !userEmail.includes("@")) {
//       console.error("Invalid email address provided:", userEmail);
//       throw new Error("Invalid email address");
//     }
  
//     try {
//       const templateParams = {
//         to_email: userEmail,
//         welcome_link: `${window.location.origin}/home`,
//         from_name: "CodeForge",
//         reply_to: "pagadalamahindrareddy@gmail.com",
//       };
  
//       const response = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams,
//         EMAILJS_PUBLIC_KEY
//       );
  
//       console.log("Welcome email sent successfully:", response);
//       return true;
//     } catch (error) {
//       console.error("Email sending error:", error);
//       console.error("Error details:", error.text || error.message);
//       throw new Error("Failed to send welcome email");
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Basic validation
//     if (!email || !password) {
//       setError("Email and password are required");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (isRegister) {
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: `${window.location.origin}/home`,
//           },
//         });

//         console.log("Signup response:", { data, error }); // Debug signup
//         if (error) throw error;

//         if (data.user) {
//           console.log("User created:", data.user); // Confirm user creation
//           try {
//             await sendWelcomeEmail(email); // Attempt to send welcome email
//             alert("Account created successfully! Check your email for a welcome message.");
//           } catch (emailError) {
//             console.warn("Proceeding despite email failure:", emailError);
//             alert("Account created successfully! Welcome email failed to send.");
//           }
//           setIsRegister(false); // Switch to login mode
//         } else {
//           setError("Signup failed: No user data returned.");
//         }
//       } else {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//         console.log("Login response:", { data, error }); // Debug login
//         if (error) throw error;

//         localStorage.setItem("isLoggedIn", "true");
//         navigate("/home");
//       }
//     } catch (error) {
//       console.error("Authentication error:", error);
//       let errorMessage = "An error occurred during authentication";
//       if (error.message.includes("Email not confirmed")) {
//         errorMessage = "Email not confirmed. Please check your Supabase settings.";
//       } else if (error.message.includes("Invalid login credentials")) {
//         errorMessage = "Invalid email or password. Please check your credentials.";
//       } else if (error.message.includes("Failed to send welcome email")) {
//         errorMessage = "Account created, but failed to send welcome email.";
//       } else if (error.message.includes("Invalid email address")) {
//         errorMessage = "Invalid email address provided for welcome email.";
//       }
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-zinc-900">
//       <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-zinc-700/50">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">
//           {isRegister ? "Create an Account" : "Log In to CodeForge"}
//         </h2>

//         {error && (
//           <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-300 mb-2">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-300 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-white"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//           >
//             {loading ? "Loading..." : isRegister ? "Sign Up" : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setIsRegister(!isRegister)}
//             className="text-violet-400 hover:text-violet-300 transition-colors"
//           >
//             {isRegister
//               ? "Already have an account? Sign In"
//               : "Need an account? Sign Up"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// emailjs.init(EMAILJS_PUBLIC_KEY);

// export default LoginPage;