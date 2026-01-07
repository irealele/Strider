import React from 'react';
import { SectionHeader } from './SectionHeader';
import './Badges.css';

// --- DATA: REALISTIC STUDENT SCENARIOS ---
const BADGES = [
  { 
    id: 1, 
    title: 'First Steps', 
    desc: 'Walk your first 1,000 steps.', 
    icon: '👟', 
    unlocked: true 
  },
  { 
    id: 2, 
    title: 'Bye Bye STB', 
    desc: 'Walk 5km in a single day instead of taking the bus.', 
    icon: '🚌', 
    unlocked: true 
  },
  { 
    id: 3, 
    title: 'Duel Master', 
    desc: 'Win 5 Duels against friends.', 
    icon: '⚔️', 
    unlocked: true 
  },
  { 
    id: 4, 
    title: 'Nu mai iau Bolt', 
    desc: 'Walk home after 10 PM on a Saturday.', 
    icon: '🌙', 
    unlocked: true 
  },
  { 
    id: 5, 
    title: 'Sesiune Survivor', 
    desc: 'Log activity every day during exam week.', 
    icon: '📚', 
    unlocked: false 
  },
  { 
    id: 6, 
    title: 'Coffee Addict', 
    desc: 'Redeem 5 Coffee Vouchers.', 
    icon: '☕', 
    unlocked: false 
  },
  { 
    id: 7, 
    title: 'Samsar de Pasi', 
    desc: 'Accumulate 100,000 Lifetime Steps.', 
    icon: '🚗', 
    unlocked: false 
  },
  { 
    id: 8, 
    title: 'Clan Leader', 
    desc: 'Invite 3 friends to your Clan.', 
    icon: '🛡️', 
    unlocked: false 
  },
  { 
    id: 9, 
    title: 'Marathon Man', 
    desc: 'Walk 42km total distance.', 
    icon: '🏃', 
    unlocked: false 
  },
  { 
    id: 10, 
    title: 'Rich Kid', 
    desc: 'Hold 5,000 $SC in your wallet at once.', 
    icon: '💎', 
    unlocked: false 
  }
];

export const Achievements = ({ onBack }: { onBack: () => void }) => {
  const unlockedCount = BADGES.filter(b => b.unlocked).length;
  const progressPercent = (unlockedCount / BADGES.length) * 100;

  return (
    <div className="page-container animate-slide-up">
      {/* 1. Header with Back Button */}
      <SectionHeader title="Trophy Case" onBack={onBack} />

      {/* 2. Overall Progress */}
      <div className="ach-progress-zone">
        <h2 style={{margin:'0 0 5px 0', fontSize:'2rem', color:'#fff'}}>{unlockedCount}/{BADGES.length}</h2>
        <span style={{color:'var(--text-muted)', fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'1px'}}>Badges Unlocked</span>
        
        <div className="prog-bar-bg">
          <div className="prog-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        
        <div style={{fontSize:'0.8rem', color:'#00f2ea', marginTop: '10px'}}>
          Next Rank: <strong>Step Master</strong>
        </div>
      </div>

      {/* 3. The Grid */}
      <div className="achievements-grid">
        {BADGES.map((badge) => (
          <div key={badge.id} className={`ach-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="ach-icon">{badge.icon}</div>
            <div className="ach-info">
              <h3>{badge.title}</h3>
              <p>{badge.desc}</p>
            </div>
            {/* Lock Overlay for locked items */}
            {!badge.unlocked && (
              <div style={{position:'absolute', top:'10px', right:'10px', fontSize:'0.8rem'}}>🔒</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};