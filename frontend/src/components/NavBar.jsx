import React from 'react';

const Navbar = ({ showAuthModal }) => {
  return (
    <header className="py-8">
      <div className="container">
        <nav className="flex justify-between items-center">
          <a href="#" className="text-2xl font-semibold text-accent flex items-center gap-2 no-underline">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center text-bg">&lt;/&gt;</div>
            Code Forge
          </a>
          <button className="btn" id="loginBtn" onClick={showAuthModal}>Get Started</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;