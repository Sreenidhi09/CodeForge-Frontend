import React from 'react';

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-violet-500">CodeForge</span>
        </div>
        
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} CodeForge. All rights reserved.
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;