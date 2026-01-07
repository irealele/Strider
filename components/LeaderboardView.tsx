import React, { useState } from 'react';
import { UserAvatar } from './UserAvatar';
import './Leaderboard.css';
import './SectionStyles.css';
import { SectionHeader } from './SectionHeader';

// GENERATE REALISTIC CLAN DATA
const CLAN_DATA = [
  { rank: 1, username: '@The_LEGEND_0rZaNN', score: 98000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TheLegend_Formal&topType=ShortHairTheCaesarSidePart&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&skinColor=Light&jGraphicType=None' },
  { rank: 2, username: '@crypto_walker', score: 94500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=crypto' },
  { rank: 3, username: '@ana_running', score: 88200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana' },
  { rank: 4, username: '@fit_king', score: 81000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=king' },
  { rank: 5, username: '@hustler_v', score: 72000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=v' },
  { rank: 6, username: '@speedy_gonzales', score: 68500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=speedy' },
  { rank: 7, username: '@night_owl_ro', score: 65200, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=night' },
  { rank: 8, username: '@marathon_man', score: 61000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mara' },
  { rank: 9, username: '@coffee_addict', score: 58900, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coffee' },
  { rank: 10, username: '@ase_student_99', score: 54000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ase' },
  { rank: 11, username: '@exam_session', score: 49500, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=exam' },
  { rank: 12, username: '@walking_dead', score: 42000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dead' },
  { rank: 13, username: '@metrics_guru', score: 38000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=metrics' },
  { rank: 14, username: '@lazy_dave', score: 22000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dave' },
  { rank: 15, username: '@new_recruit', score: 15000, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=recruit' },
];

interface Props {
    onBack?: () => void;
}

const LeaderboardView = ({ onBack }: Props) => {
  const [filter, setFilter] = useState<'Global' | 'Clan'>('Clan'); // Default to Clan to show the list

  const data = filter === 'Clan' ? CLAN_DATA : CLAN_DATA.slice(0, 5); // Mocking global as shorter for now

  return (
    <div className="page-container animate-slide-up">
      
      <SectionHeader 
        title="Weekly Top" 
        onBack={onBack} 
        rightElement={<span className="season-tag">SEASON 1 • WEEK 4</span>}
      />

      <div className="toggle-pill-container">
        <div className="toggle-pill">
          <button className={filter === 'Global' ? 'active' : ''} onClick={() => setFilter('Global')}>Global</button>
          <button className={filter === 'Clan' ? 'active' : ''} onClick={() => setFilter('Clan')}>My Clan</button>
        </div>
      </div>

      <div className="lb-list" style={{ paddingBottom: '20px' }}>
        {data.map((entry) => (
          <div key={entry.rank} className={`lb-card rank-${entry.rank}`}>
            <span className="rank-num">#{entry.rank}</span>
            
            {/* CONDITIONAL RENDER: If it's YOU, show Custom Avatar. If others, show Image. */}
            {entry.username.includes('The_LEGEND') ? (
              <div style={{marginRight:'12px'}}>
                <UserAvatar size={40} />
              </div>
            ) : (
              <img src={entry.avatar} alt="av" className="avatar-small" />
            )}

            <div className="lb-info">
              <span className="lb-user">{entry.username}</span>
              <span className="lb-clan">Studenți ASE</span>
            </div>
            <span className="lb-score">{entry.score.toLocaleString()} <small>STEPS</small></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardView;