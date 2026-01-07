import { useState } from 'react';
import { playSound } from '../utils';
import './Onboarding.css'; 

interface Props {
  onFinish: (clan: string) => void;
}

const slides = [
  {
    id: 1,
    title: "TRACK & EARN",
    subtitle: "Turn Movement into Currency",
    text: "Your phone is now a mining rig. Every step you take in the real world generates value. We track it all in the background.",
    color: "#00f2ea", // Cyan
    graphic: (
      <div className="holo-container">
        <div className="holo-circle pulse"></div>
        <svg className="holo-icon" viewBox="0 0 24 24" fill="none" stroke="#00f2ea">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    )
  },
  {
    id: 2,
    title: "DUEL & BET",
    subtitle: "High Stakes Competition",
    text: "Don't just walk. Compete. Challenge friends to 24h step battles and bet your coins. Winner takes the entire pot.",
    color: "#ff0050", // Magenta
    graphic: (
      <div className="holo-container">
        <div className="holo-circle spin-reverse"></div>
        <svg className="holo-icon" viewBox="0 0 24 24" fill="none" stroke="#ff0050">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    )
  },
  {
    id: 3,
    title: "BANK & SPEND",
    subtitle: "Real World Rewards",
    text: "Steps expire at midnight. Bank them daily to mint Stride Coins ($SC) and spend them on coffee, sneakers, and tech.",
    color: "#ccff00", // Lime
    graphic: (
      <div className="holo-container">
        <div className="holo-circle float"></div>
        <svg className="holo-icon" viewBox="0 0 24 24" fill="none" stroke="#ccff00">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  }
];

const CLANS = [
  { id: 'Studenți ASE', name: 'Studenți ASE', icon: '📊', color: '#00f2ea', desc: 'Bonus: Smart Shopping' },
  { id: 'Poli Engineers', name: 'Poli Engineers', icon: '⚙️', color: '#ff0050', desc: 'Bonus: Tech Drip' },
  { id: 'UniBuc Arts', name: 'UniBuc Arts', icon: '🎨', color: '#ccff00', desc: 'Bonus: Entertainment' },
  { id: 'Carol Davila', name: 'Carol Davila', icon: '⚕️', color: '#a5b4fc', desc: 'Bonus: Health Vitals' }
];

export const Onboarding = ({ onFinish }: Props) => {
  const [current, setCurrent] = useState(0);
  const [selectedClan, setSelectedClan] = useState<string>('Studenți ASE');

  const isSlidePhase = current < slides.length;
  const slide = isSlidePhase ? slides[current] : null;

  const handleNext = () => {
    playSound('click');
    if (current < slides.length) {
      setCurrent(prev => prev + 1);
    } else {
      // Finish Onboarding with selected clan
      onFinish(selectedClan);
    }
  };

  return (
    <div className="ob-screen">
      {/* Background Gradient Mesh */}
      <div 
        className="ob-bg" 
        style={{ 
          background: isSlidePhase 
            ? `radial-gradient(circle at 50% 30%, ${slide!.color}20, transparent 60%)` 
            : `radial-gradient(circle at 50% 30%, #ffffff10, transparent 60%)`
        }} 
      />

      <div className="ob-content animate-slide-up">
        
        {isSlidePhase ? (
          <>
            {/* Animated Graphic */}
            <div className="ob-graphic-wrapper">
              {slide!.graphic}
            </div>

            {/* Text Content */}
            <div className="ob-text-area">
              <h1 className="ob-title" style={{ textShadow: `0 0 30px ${slide!.color}60` }}>
                {slide!.title}
              </h1>
              <h3 className="ob-subtitle" style={{ color: slide!.color }}>
                {slide!.subtitle}
              </h3>
              <p className="ob-desc">
                {slide!.text}
              </p>
            </div>
          </>
        ) : (
          /* CLAN SELECTION VIEW */
          <div className="clan-select-area animate-slide-up">
             <h1 className="ob-title" style={{ marginBottom: '10px' }}>CHOOSE FACTION</h1>
             <p className="ob-desc" style={{ marginBottom: '30px' }}>
               Join a Clan to compete in weekly wars.
             </p>
             
             <div className="clan-grid">
               {CLANS.map(clan => (
                 <div 
                   key={clan.id} 
                   className={`clan-card ${selectedClan === clan.id ? 'selected' : ''}`}
                   onClick={() => { playSound('click'); setSelectedClan(clan.id); }}
                   style={{ borderColor: selectedClan === clan.id ? clan.color : '' }}
                 >
                   <span className="clan-icon">{clan.icon}</span>
                   <span className="clan-name">{clan.name}</span>
                   <span className="clan-desc" style={{ color: clan.color }}>{clan.desc}</span>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="ob-dots">
          {[...slides, { id: 'clan' }].map((_, idx) => (
            <div 
              key={idx} 
              className={`ob-dot ${idx === current ? 'active' : ''}`}
              style={{ background: idx === current ? (isSlidePhase ? slide!.color : '#fff') : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>

        {/* Action Button */}
        <button 
          className="ob-btn" 
          onClick={handleNext}
          style={isSlidePhase ? { 
            borderColor: slide!.color, 
            color: slide!.color,
          } : {
            background: 'linear-gradient(90deg, #00f2ea, #ff0050)',
            border: 'none',
            color: '#000',
            boxShadow: '0 0 30px rgba(0, 242, 234, 0.4)'
          }}
        >
          {isSlidePhase ? "NEXT" : "ENTER THE ARENA"}
        </button>
      </div>
    </div>
  );
};