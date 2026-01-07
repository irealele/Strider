import { useState } from 'react';
import { playSound } from '../utils';
import './Statistics.css';
import { SectionHeader } from './SectionHeader';

// --- MOCK DATA FOR GRAPHS ---
const WEEKLY_DATA = [
  { day: 'Mon', steps: 4500, height: '30%' },
  { day: 'Tue', steps: 9200, height: '70%' },
  { day: 'Wed', steps: 12400, height: '90%' },
  { day: 'Thu', steps: 3100, height: '20%' },
  { day: 'Fri', steps: 15000, height: '100%' }, // Peak
  { day: 'Sat', steps: 8500, height: '60%' },
  { day: 'Sun', steps: 6000, height: '45%' },
];

const MONTHLY_DATA = [
  { day: 'W1', steps: 45000, height: '60%' },
  { day: 'W2', steps: 52000, height: '75%' },
  { day: 'W3', steps: 38000, height: '45%' },
  { day: 'W4', steps: 61000, height: '90%' },
];

export const Statistics = ({ onBack }: { onBack: () => void }) => {
  const [timeframe, setTimeframe] = useState<'Day' | 'Week' | 'Month'>('Day');

  // --- RENDER HELPERS ---

  // 1. DAY VIEW: The "Apple Watch" Rings
  const renderDayView = () => (
    <div className="stats-hero-ring animate-scale-in">
      {/* Outer Ring: Steps - Keep inline style for dynamic value simulation (75%) */}
      <div className="ring-outer" style={{ background: `conic-gradient(#00f2ea 75%, rgba(255,255,255,0.1) 0)` }}>
        {/* Inner Ring: Calories - CSS now handles the gradient via ::before to create the mask effect */}
        <div className="ring-inner">
          <div className="ring-content">
            <span className="ring-title">TODAY</span>
            <span className="ring-value">7,542</span>
            <span className="ring-sub">/ 10,000 Steps</span>
          </div>
        </div>
      </div>
      
      <div className="ring-legend">
        <div className="legend-item"><span className="dot cyan"></span> Steps (75%)</div>
        <div className="legend-item"><span className="dot pink"></span> Cals (60%)</div>
      </div>
    </div>
  );

  // 2. WEEK/MONTH VIEW: Bar Charts
  const renderGraphView = (data: typeof WEEKLY_DATA) => (
    <div className="graph-container animate-slide-up">
      <div className="bars-wrapper">
        {data.map((item, idx) => (
          <div key={idx} className="bar-group">
            <div 
              className="bar-fill" 
              style={{ height: item.height, animationDelay: `${idx * 0.1}s` }}
            >
              <span className="bar-tooltip">{item.steps/1000}k</span>
            </div>
            <span className="bar-label">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="graph-meta">
        <span>🔥 Best: Friday (15k)</span>
        <span>📉 Avg: 8.2k / day</span>
      </div>
    </div>
  );

  return (
    <div className="page-container stats-page">
      {/* Header */}
      <SectionHeader 
        title="Performance" 
        onBack={() => { playSound('click'); onBack(); }} 
      />

      {/* Timeframe Switcher */}
      <div className="time-tabs">
        {['Day', 'Week', 'Month'].map((t) => (
          <button 
            key={t} 
            className={`time-tab ${timeframe === t ? 'active' : ''}`}
            onClick={() => { playSound('click'); setTimeframe(t as any); }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Visual */}
      <div className="stats-main-display">
        {timeframe === 'Day' && renderDayView()}
        {timeframe === 'Week' && renderGraphView(WEEKLY_DATA)}
        {timeframe === 'Month' && renderGraphView(MONTHLY_DATA)}
      </div>

      {/* Vitals Grid (Inspired by Garmin) */}
      <h3 className="section-title">Health Vitals</h3>
      <div className="vitals-grid animate-slide-up delay-1">
        <div className="vital-card">
          <div className="vital-icon">🔥</div>
          <div className="vital-data">
            <span className="vital-val">480</span>
            <span className="vital-label">Active Kcal</span>
          </div>
        </div>
        <div className="vital-card">
          <div className="vital-icon">❤️</div>
          <div className="vital-data">
            <span className="vital-val">72 <small>bpm</small></span>
            <span className="vital-label">Resting HR</span>
          </div>
        </div>
        <div className="vital-card">
          <div className="vital-icon">⚡</div>
          <div className="vital-data">
            <span className="vital-val">42 <small>min</small></span>
            <span className="vital-label">Zone 2 (Fat Burn)</span>
          </div>
        </div>
        <div className="vital-card">
          <div className="vital-icon">💤</div>
          <div className="vital-data">
            <span className="vital-val">7h 12m</span>
            <span className="vital-label">Sleep (Synced)</span>
          </div>
        </div>
      </div>

      {/* Insights (AI Style) */}
      <div className="insight-box animate-slide-up delay-2">
        <div className="insight-header">
          <span className="ai-badge">AI INSIGHT</span>
          <span>Today vs. Avg</span>
        </div>
        <p>
          You are <strong>12% more active</strong> than last Monday. 
          Your pace averaged <strong>5.2 km/h</strong>, which is optimal for cardio health.
          Keep this rhythm to hit your weekly goal by Saturday.
        </p>
      </div>
    </div>
  );
};