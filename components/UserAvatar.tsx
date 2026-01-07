import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

export const UserAvatar = ({ size = 50, className = '' }: Props) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ borderRadius: '50%', overflow: 'hidden' }}
    >
      {/* 1. Background Circle */}
      <circle cx="50" cy="50" r="50" fill="#2d3436" />

      {/* 2. Hoodie Body (Grey) */}
      <path d="M20 90 C20 75, 80 75, 80 90 V100 H20 Z" fill="#636e72" />
      
      {/* 3. Neck (Skin) */}
      <rect x="40" y="60" width="20" height="15" fill="#f1c27d" />

      {/* 4. Head Shape (Skin) */}
      <ellipse cx="50" cy="50" rx="18" ry="22" fill="#f1c27d" />

      {/* 5. The Goatee (Beard) */}
      <path 
        d="M45 68 Q50 75 55 68 L55 68 L50 72 L45 68 Z" 
        fill="#2d3436" 
        stroke="#2d3436" 
        strokeWidth="2"
      />
      <path d="M47 70 Q50 73 53 70" stroke="#2d3436" strokeWidth="2" fill="none" />

      {/* 6. Mouth (Serious/Determined) */}
      <path d="M46 63 Q50 64 54 63" stroke="#8d6e63" strokeWidth="1.5" strokeLinecap="round" />

      {/* 7. Eyes (White + Pupils) */}
      <circle cx="43" cy="48" r="4" fill="white" />
      <circle cx="57" cy="48" r="4" fill="white" />
      <circle cx="43" cy="48" r="1.5" fill="#000" />
      <circle cx="57" cy="48" r="1.5" fill="#000" />

      {/* 8. Eyebrows (Black - Focused) */}
      <path d="M40 43 L46 44" stroke="#2d3436" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 43 L54 44" stroke="#2d3436" strokeWidth="1.5" strokeLinecap="round" />

      {/* 9. The Blue Beanie (Signature Look) */}
      <path d="M30 40 Q50 20 70 40 L70 45 Q50 35 30 45 Z" fill="#0984e3" /> {/* Main Hat */}
      <path d="M28 42 Q50 32 72 42 L72 48 Q50 38 28 48 Z" fill="#74b9ff" /> {/* Rim/Cuff */}
      <circle cx="50" cy="28" r="4" fill="#74b9ff" /> {/* Pom-pom on top */}

    </svg>
  );
};