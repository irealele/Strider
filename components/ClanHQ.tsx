import React from 'react';
import './SectionStyles.css'; 
import { UserAvatar } from './UserAvatar';
import { SectionHeader } from './SectionHeader';

const CONTRIBUTORS = [
  { rank: 1, name: '@The_LEGEND_0rZaNN', steps: '145k' },
  { rank: 2, name: '@crypto_walker', steps: '132k' },
  { rank: 3, name: '@ana_running', steps: '98k' }
];

export const ClanHQ = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="page-container animate-slide-up">
      <SectionHeader title="Clan HQ" onBack={onBack} />

      <div className="clan-hero">
        <div className="clan-badge">🛡️</div>
        <h1>Studenți ASE</h1>
        <p className="clan-motto">"Markets close, we never stop."</p>
        <div className="clan-stats-row">
          <div className="c-stat"><span>Rank</span><strong>#5</strong></div>
          <div className="c-stat"><span>Members</span><strong>1,240</strong></div>
          <div className="c-stat"><span>Weekly Steps</span><strong>15.4M</strong></div>
        </div>
      </div>

      <div className="goal-card">
        <h3>🎯 Weekly Objective</h3>
        <p>Reach 20 Million Steps to unlock <strong>50% off WorldClass</strong></p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
        <span className="progress-text">15.4M / 20M Steps</span>
      </div>

      <div className="members-list">
        <h3>Top Contributors</h3>
        {CONTRIBUTORS.map((mem) => (
          <div key={mem.rank} className="member-row">
            <span className="mem-rank">{mem.rank}</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
               {/* If it's you, show the SVG */}
               {mem.name.includes('The_LEGEND') && <UserAvatar size={30} />}
               <span className="mem-name" style={{ flex: 'none' }}>{mem.name}</span>
            </div>

            <span className="mem-steps">{mem.steps} 👣</span>
          </div>
        ))}
      </div>
    </div>
  );
};