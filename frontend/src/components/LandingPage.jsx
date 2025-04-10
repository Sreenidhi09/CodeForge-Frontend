import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header/Navigation */}
      <header className="bg-zinc-950 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-violet-500">
            <span className="text-2xl">⚡</span>
            CodeForge
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-300 hover:text-violet-400 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-gray-300 hover:text-violet-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-gray-300 hover:text-violet-400 transition-colors">Testimonials</a>
            <button 
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-md text-sm font-medium transition-colors"
            >
              Login
            </button>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-500 to-emerald-500 text-transparent bg-clip-text">
            Master Data Structures & Algorithms
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Elevate your coding skills with our interactive platform designed for developers at all levels. 
            From basic concepts to advanced interview preparation.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-emerald-600 rounded-md text-lg font-medium hover:opacity-90 transition-all hover:-translate-y-0.5"
          >
            Get Started For Free
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose CodeForge?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <div className="text-4xl mb-4 text-violet-500">🚀</div>
              <h3 className="text-xl font-bold mb-3">Interactive Learning</h3>
              <p className="text-gray-400">Hands-on exercises and real-time feedback to reinforce your understanding of complex concepts.</p>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <div className="text-4xl mb-4 text-violet-500">🎯</div>
              <h3 className="text-xl font-bold mb-3">Structured Curriculum</h3>
              <p className="text-gray-400">Follow a clear learning path designed by industry experts, from fundamentals to advanced topics.</p>
            </div>
            
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
              <div className="text-4xl mb-4 text-violet-500">💼</div>
              <h3 className="text-xl font-bold mb-3">Interview Preparation</h3>
              <p className="text-gray-400">Practice with problems commonly asked at top tech companies and receive detailed explanations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to boost your coding skills?</h2>
          <p className="text-xl text-gray-400 mb-8">Join thousands of developers who have accelerated their career with CodeForge.</p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 rounded-md text-lg font-medium transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-zinc-950 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-xl font-bold text-violet-500 mb-6 md:mb-0">
              <span className="text-2xl">⚡</span>
              CodeForge
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Tutorials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Contact</a></li>
                </ul>
                </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-gray-400 hover:text-violet-400 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 CodeForge. All rights reserved.
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-violet-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <span>𝕏</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-violet-600 transition-colors">
                <span className="sr-only">GitHub</span>
                <span>𝔾</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-violet-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <span>𝕃</span>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-violet-600 transition-colors">
                <span className="sr-only">Discord</span>
                <span>𝔻</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

              