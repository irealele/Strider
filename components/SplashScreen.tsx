import React from 'react';
import './SplashScreen.css';

export const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        {/* Animated Logo Container */}
        <div className="splash-logo-wrapper">
          <div className="splash-ring"></div>
          <svg className="splash-icon" viewBox="0 0 24 24" fill="none" stroke="#fff">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Brand Name with Gradient */}
        <h1 className="splash-title">STRIDER</h1>
        
        {/* Slogan */}
        <p className="splash-slogan">WALK. DUEL. EARN.</p>
      </div>

      {/* Version Info (Best Practice) */}
      <div className="splash-footer">
        <span className="version">v1.0.4 (Beta)</span>
        <div className="loader-line"></div>
      </div>
    </div>
  );
};