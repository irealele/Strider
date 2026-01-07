import React from 'react';
import './Wallet.css';
import './SectionStyles.css';
import { SectionHeader } from './SectionHeader';

// --- MOCK TRANSACTION DATA ---
const TRANSACTIONS = [
  { id: 1, title: 'Daily Bank', date: 'Today, 10:30', amount: '+450', type: 'earn' },
  { id: 2, title: 'Duel Victory', date: 'Yesterday', amount: '+1,000', type: 'earn' },
  { id: 3, title: '5 to go Coffee', date: '12 Dec', amount: '-200', type: 'spend' },
  { id: 4, title: 'Weekly Bonus', date: '10 Dec', amount: '+500', type: 'earn' },
  { id: 5, title: 'Cinema City', date: '08 Dec', amount: '-1,000', type: 'spend' },
];

interface Props {
    onBack: () => void;
    balance: number;
    isNav?: boolean;
}

export const Wallet = ({ onBack, balance, isNav = false }: Props) => {
  return (
    <div className="page-container wallet-page animate-slide-up">
      <SectionHeader 
        title="My Wallet" 
        onBack={!isNav ? onBack : undefined} 
      />

      {/* 1. HERO CARD (ATMOSPHERE) */}
      <div className="wallet-hero">
        <div className="coin-3d-container">
          {/* THE NEW CURRENCY LOGO */}
          <svg className="coin-svg" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" /> {/* Gold */}
                <stop offset="100%" stopColor="#ffaa00" /> {/* Orange Gold */}
              </linearGradient>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#coinGrad)" strokeWidth="2" fill="rgba(255, 215, 0, 0.1)" />
            <circle cx="50" cy="50" r="35" stroke="url(#coinGrad)" strokeWidth="1" opacity="0.5" />
            <path 
              d="M55 25 L35 50 L45 50 L35 75 L65 45 L50 45 L60 25 Z" 
              fill="url(#coinGrad)" 
              filter="url(#glow-gold)"
            />
          </svg>
        </div>
        
        <span className="balance-label">Total Balance</span>
        <h1 className="balance-amount">
          {balance.toLocaleString()} <span className="currency-symbol">STR</span>
        </h1>
        <p className="fiat-equiv">≈ {(balance / 100).toFixed(2)} RON</p>
      </div>

      {/* MINING RATE INFO CARD */}
      <div className="wallet-chart-card" style={{marginTop: '-20px', background: 'rgba(0, 242, 234, 0.05)', borderColor: 'rgba(0, 242, 234, 0.2)'}}>
        <div className="chart-header">
          <span style={{color: '#00f2ea', fontWeight: 'bold'}}>⛏️ Mining Rate (V2.0)</span>
        </div>
        <div style={{fontSize: '0.85rem', color: '#ccc', lineHeight: '1.5'}}>
          <p>• <strong>Base Rate:</strong> 1,000 Steps = <strong>2 STR</strong></p>
          <p>• <strong>Daily Cap:</strong> 15,000 Steps (Max 30 STR/day)</p>
          <p>• <strong>Streak Bonus:</strong> +10 STR every 3 days.</p>
        </div>
      </div>

      {/* 2. MINI CHART (WEEKLY TREND) */}
      <div className="wallet-chart-card">
        <div className="chart-header">
          <span>Earnings</span>
          <span className="chart-growth">+12% this week</span>
        </div>
        <div className="chart-bars">
          {/* CSS-only Bar Chart */}
          {[30, 50, 45, 80, 60, 90, 40].map((h, i) => (
            <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <div className="chart-days">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>

      {/* 3. TRANSACTION HISTORY */}
      <div className="history-section">
        <h3>Recent Activity</h3>
        <div className="transaction-list">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="tx-row">
              <div className={`tx-icon ${tx.type}`}>
                {tx.type === 'earn' ? '↓' : '↑'}
              </div>
              <div className="tx-info">
                <span className="tx-title">{tx.title}</span>
                <span className="tx-date">{tx.date}</span>
              </div>
              <span className={`tx-amount ${tx.type}`}>
                {tx.amount} STR
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};