import React from 'react';
import './SectionStyles.css';

interface Props {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode; // Optional: For "Settings" icons etc.
}

export const SectionHeader = ({ title, onBack, rightElement }: Props) => {
  return (
    <div className="section-header-container">
      <div className="header-left">
        {onBack && (
          <button className="nav-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <h2 className="header-title">{title}</h2>
      </div>
      {rightElement && <div className="header-right">{rightElement}</div>}
    </div>
  );
};