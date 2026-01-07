import React, { useState, useEffect } from 'react';
import { UserProfile, ViewState } from './types';
import { calculateMarginalEarnings, calculateEarnings, playSound, formatCurrency, DAILY_STEP_CAP } from './utils';
import { getCoachMessage } from './services/geminiService';
import { Onboarding } from './components/Onboarding';
import { Welcome } from './components/Welcome';
import { Marketplace } from './components/Marketplace';
import LeaderboardView from './components/LeaderboardView';
import ProfileView from './components/ProfileView';
import { ClanHQ } from './components/ClanHQ';
import { History } from './components/History';
import { MyVouchers } from './components/MyVouchers';
import { Settings } from './components/Settings';
import { Statistics } from './components/Statistics';
import { Achievements } from './components/Achievements';
import { GlobalChat } from './components/GlobalChat';
import { Wallet } from './components/Wallet';
import { SplashScreen } from './components/SplashScreen';
import Navbar from './components/Navbar'; 
import { UserAvatar } from './components/UserAvatar';
import { AnimatedCounter } from './components/AnimatedCounter';
import { Zap, Coins } from 'lucide-react';
import './App.css';

// Mock User Data - Rebalanced for V2 Economy (Low SC numbers)
const INITIAL_USER: UserProfile = {
  id: 'u1',
  username: 'The_LEGEND_0rZaNN',
  clan: 'Studenți ASE',
  stepsToday: 0,
  walletBalance: 120, // Rebalanced: 120 SC is decent (60k steps)
  joinDate: '12 Nov 2025',
  totalSteps: 452000,
  totalDistanceKm: 315,
  duelsWon: 34,
  duelsLost: 19,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TheLegend_Formal&topType=ShortHairTheCaesarSidePart&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&skinColor=Light&jGraphicType=None'
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<ViewState>('welcome');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  
  // Pending steps (Unbanked steps simulation)
  const [pendingSteps, setPendingSteps] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [coachMsg, setCoachMsg] = useState("Lacing up sneakers...");

  // Date State
  const today = new Date().toLocaleDateString('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  // Calculate Google Fit Metrics
  const totalDisplaySteps = user.stepsToday + pendingSteps;
  const calories = Math.floor(totalDisplaySteps * 0.04); 
  const distanceKm = (totalDisplaySteps * 0.00076).toFixed(2);
  const moveMinutes = Math.floor(totalDisplaySteps * 0.01); // Approx 100 steps/min adjusted

  const simulateWalk = () => {
    setIsWalking(true);
    setPendingSteps(prev => prev + 150);
    setTimeout(() => setIsWalking(false), 200);
  };

  const handleBankCoins = async () => {
    if (pendingSteps === 0) return;

    // V2 Logic: Calculate what we earn by adding these steps
    const earnedCoins = calculateMarginalEarnings(user.stepsToday, pendingSteps);

    // Check if they hit the cap (Simulation logic)
    const totalProjected = user.stepsToday + pendingSteps;
    if (totalProjected > DAILY_STEP_CAP) {
       setCoachMsg("⚠️ Daily Cap Reached! You only earn on the first 15k steps.");
    } else {
       playSound('success');
       setCoachMsg(`💸 Banked! Rate: 2 $SC per 1k steps.`);
    }

    setUser(prev => ({
      ...prev,
      stepsToday: prev.stepsToday + pendingSteps,
      walletBalance: prev.walletBalance + earnedCoins
    }));

    setPendingSteps(0);
  };

  const handlePurchase = (cost: number, itemTitle: string) => {
    if (user.walletBalance >= cost) {
        setUser(prev => ({
            ...prev,
            walletBalance: prev.walletBalance - cost
        }));
    }
  };

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    const fetchIntro = async () => {
        const msg = await getCoachMessage(0, 'morning');
        setCoachMsg(msg);
    };
    fetchIntro();

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  // Calculate marginal earnings for the bank button display
  const potentialBankEarnings = calculateMarginalEarnings(user.stepsToday, pendingSteps);

  return (
    <div className="strider-app">
      {view === 'welcome' && (
        <Welcome onStart={() => { playSound('click'); setView('onboarding'); }} />
      )}

      {view === 'onboarding' && (
        <div className="animate-fade-in">
          <Onboarding onFinish={(selectedClan) => { 
            playSound('click'); 
            setUser(prev => ({ ...prev, clan: selectedClan }));
            setView('home'); 
          }} />
        </div>
      )}

      {view !== 'welcome' && view !== 'onboarding' && (
        <>
          <div className="page-content">
            
            {/* --- HOME DASHBOARD (Compact V2) --- */}
            {view === 'home' && (
              <div className="animate-fade-in">
                
                {/* 1. Header with Avatar & Date */}
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 20px 0 20px'}}>
                   <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                     <UserAvatar size={45} /> 
                     <div>
                       <span style={{fontSize:'0.7rem', color:'#00f2ea', fontWeight:700, letterSpacing:'1px', textTransform: 'uppercase'}}>{today}</span>
                       <h2 style={{margin:0, fontSize:'1.1rem'}}>{user.username}</h2>
                     </div>
                   </div>
                </div>

                {/* 2. COMPACT HERO SECTION */}
                <div className="hero-section">
                  <div className="progress-circle-container">
                    {/* SVG Circle Background */}
                    <svg width="200" height="200" viewBox="0 0 200 200" style={{transform:'rotate(-90deg)'}}>
                      <circle cx="100" cy="100" r="85" stroke="#222" strokeWidth="12" fill="none" />
                      <circle 
                        cx="100" cy="100" r="85" 
                        stroke="#ff0050" 
                        strokeWidth="12" 
                        fill="none" 
                        strokeDasharray="534" 
                        strokeDashoffset={534 - (534 * (Math.min(user.stepsToday, DAILY_STEP_CAP) / DAILY_STEP_CAP))} 
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Text Inside Circle */}
                    <div style={{position:'absolute', textAlign:'center'}}>
                      <span className="hero-steps-val">
                        <AnimatedCounter value={totalDisplaySteps} />
                      </span>
                      <span className="hero-steps-label" style={{display:'block'}}>/ {DAILY_STEP_CAP / 1000}k steps</span>
                    </div>
                  </div>
                  
                  {/* Daily Cap Indicator */}
                  <div style={{fontSize: '0.7rem', color: '#555', marginTop: '5px'}}>
                    Daily Cap: {user.stepsToday > 15000 ? 15000 : user.stepsToday} / 15,000
                  </div>
                </div>

                {/* 3. COMPACT STATS ROW */}
                <div className="stats-row">
                  <div className="stat-card-small">
                    <span className="stat-val">{Math.round(totalDisplaySteps * 0.04)}</span>
                    <span className="stat-label">Kcal</span>
                  </div>
                  <div className="stat-card-small">
                    <span className="stat-val">{(totalDisplaySteps * 0.00076).toFixed(2)}</span>
                    <span className="stat-label">Km</span>
                  </div>
                  <div className="stat-card-small">
                    <span className="stat-val">{Math.round(totalDisplaySteps * 0.01)}</span>
                    <span className="stat-label">Mins</span>
                  </div>
                </div>

                {/* 4. BANK BUTTON */}
                <div className="bank-zone">
                  <button 
                    className={`bank-btn ${pendingSteps > 0 ? 'active' : ''}`}
                    onClick={handleBankCoins}
                    disabled={pendingSteps === 0}
                  >
                    {pendingSteps > 0 ? `BANK ${potentialBankEarnings} COINS` : 'NO COINS TO BANK'}
                  </button>
                  <div 
                    onClick={simulateWalk}
                    style={{textAlign:'center', marginTop:'8px', fontSize:'0.7rem', color:'#444', cursor:'pointer'}}
                  >
                    [ TAP TO SIMULATE MOVEMENT ]
                  </div>
                </div>

                {/* 5. COACH TIP */}
                <div className="coach-card">
                  <span className="coach-title">⚡ Strider Coach</span>
                  <p className="coach-text">"{coachMsg}"</p>
                </div>

              </div>
            )}

            {/* Other Views */}
            {view === 'market' && (
                <div className="animate-fade-in">
                    <Marketplace balance={user.walletBalance} onPurchase={handlePurchase} />
                </div>
            )}
            {view === 'wallet' && (
                <div className="animate-fade-in">
                   <Wallet onBack={() => {}} balance={user.walletBalance} isNav={true} />
                </div>
            )}
            {view === 'chat' && (
                <div className="animate-fade-in">
                    <GlobalChat myUsername={user.username} clanName={user.clan} />
                </div>
            )}
            {view === 'profile' && (
                <div className="animate-fade-in">
                    <ProfileView user={user} onNavigate={setView} />
                </div>
            )}
            
            {/* Sub-Views */}
            {view === 'rank' && (
                <div className="animate-fade-in">
                    <LeaderboardView onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'clan-hq' && (
                <div className="animate-fade-in">
                   <ClanHQ onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'history' && (
                <div className="animate-fade-in">
                   <History onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'my-vouchers' && (
                <div className="animate-fade-in">
                   <MyVouchers onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'settings' && (
                <div className="animate-fade-in">
                   <Settings onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'statistics' && (
                <div className="animate-fade-in">
                   <Statistics onBack={() => setView('profile')} />
                </div>
            )}
            {view === 'badges' && (
                <div className="animate-fade-in">
                   <Achievements onBack={() => setView('profile')} />
                </div>
            )}
          </div>

          {/* Hide Navbar when inside a submenu, allow for main views */}
          {['home', 'market', 'wallet', 'chat', 'profile'].includes(view) && (
            <Navbar currentView={view} setView={setView} />
          )}
        </>
      )}
    </div>
  );
};

export default App;