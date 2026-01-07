import React from 'react';
import './Welcome.css';

interface Props {
  onStart: () => void;
}

export const Welcome = ({ onStart }: Props) => {
  return (
    <div className="welcome-container">
      {/* Ambient Background - Cleaned up */}
      <div className="bg-gradient-clean"></div>

      <div className="welcome-content">
        {/* Title Sequence */}
        <h1 className="main-title">STRIDER</h1>
        <h2 className="main-slogan">WALK. DUEL. EARN.</h2>
        
        {/* THE NEW BRAND LOGO (Sharp, Geometric, Iconic) */}
        <div className="hero-graphic-container">
          <svg className="hero-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2ea" />   {/* Cyan */}
                <stop offset="50%" stopColor="#ffffff" />   {/* White Center */}
                <stop offset="100%" stopColor="#ff0050" />  {/* Magenta */}
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* The "Strider S" Mark - Sharp, Fast, Angular */}
            <path 
              d="M65 15 L25 15 L35 45 L10 45 L50 95 L40 60 L75 60 L65 15 Z" 
              fill="url(#brandGrad)" 
              stroke="rgba(255,255,255,0.5)" 
              strokeWidth="1"
              filter="url(#glow)"
            />
            
            {/* Motion Lines (Speed) */}
            <path d="M80 25 L90 25" stroke="#00f2ea" strokeWidth="2" strokeLinecap="round" />
            <path d="M85 35 L95 35" stroke="#ff0050" strokeWidth="2" strokeLinecap="round" />
            <path d="M82 45 L88 45" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Modern Action Button */}
        <button className="modern-start-btn" onClick={onStart}>
          Enter The Arena
        </button>
      </div>
    </div>
  );
};