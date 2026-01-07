import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { calculateMarginalEarnings, formatCurrency } from '../utils';
import { getCoachMessage } from '../services/geminiService';
import { Footprints, Coins, BatteryCharging, ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: UserProfile;
  onMint: (amount: number) => void;
  onAddSteps: (amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onMint, onAddSteps }) => {
  const [unmintedSteps, setUnmintedSteps] = useState(0);
  const [motivation, setMotivation] = useState<string>('');
  
  // Fetch motivation on mount using the new service
  useEffect(() => {
    const fetchMotivation = async () => {
        const hour = new Date().getHours();
        let context: 'morning' | 'lazy' = 'lazy';
        
        // Simple logic to map time to context
        if (hour >= 5 && hour < 12) {
            context = 'morning';
        } else {
            // Default to 'lazy' roast if not morning for this persona
            context = 'lazy';
        }

        const msg = await getCoachMessage(user.stepsToday, context);
        setMotivation(msg);
    };
    fetchMotivation();
  }, [user.username]); // Run once per user session mostly

  // Simulate step accumulation for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        onAddSteps(Math.floor(Math.random() * 10) + 1);
        setUnmintedSteps(prev => prev + Math.floor(Math.random() * 10) + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [onAddSteps]);

  // V2 Algorithm: Calculate earnings based on the difference adding unminted steps would make
  const potentialEarnings = calculateMarginalEarnings(user.stepsToday, unmintedSteps);

  const handleMintClick = () => {
    if (potentialEarnings > 0) {
      onMint(potentialEarnings);
      setUnmintedSteps(0);
    }
  };

  const dailyGoal = 10000;
  const progressData = [
    { name: 'Steps', value: user.stepsToday },
    { name: 'Remaining', value: Math.max(0, dailyGoal - user.stepsToday) },
  ];
  const COLORS = ['#10b981', '#1e293b']; // emerald-500, slate-800

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Salut, {user.username}</h1>
          <p className="text-sm text-slate-400">{user.clan || "No Clan"} Member</p>
        </div>
        <div className="bg-slate-800 px-3 py-1 rounded-full flex items-center space-x-2 border border-slate-700">
          <Coins size={16} className="text-yellow-400" />
          <span className="font-mono font-bold text-white">{formatCurrency(user.walletBalance)}</span>
        </div>
      </div>

      {/* AI Daily Roast/Tip */}
      {motivation && (
        <div className="bg-gradient-to-r from-violet-900/50 to-slate-900 border border-violet-500/30 p-4 rounded-xl flex items-start space-x-3 animate-fade-in">
            <MessageSquareQuote className="text-violet-400 shrink-0 mt-1" size={20} />
            <div>
                <p className="text-sm text-violet-100 italic">"{motivation}"</p>
                <p className="text-[10px] text-violet-400 mt-1 uppercase font-bold">- StriderBot</p>
            </div>
        </div>
      )}

      {/* Main Stats Circle */}
      <div className="relative h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={progressData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {progressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Footprints size={32} className="text-emerald-400 mb-2" />
          <span className="text-4xl font-bold text-white">{user.stepsToday.toLocaleString()}</span>
          <span className="text-sm text-slate-400">/ {dailyGoal.toLocaleString()} steps</span>
        </div>
      </div>

      {/* Minting Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Coins size={100} />
        </div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h2 className="text-lg font-semibold text-white">Mint Stride Coins</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
              <BatteryCharging size={14} className="text-yellow-400" />
              <span>Rate: 2 SC / 1k Steps</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-400">+{potentialEarnings}</div>
            <div className="text-xs text-slate-500">Available to Mint</div>
          </div>
        </div>

        <button
          onClick={handleMintClick}
          disabled={potentialEarnings === 0}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all relative z-10 ${
            potentialEarnings > 0 
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Mint to Wallet</span>
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Streak</h3>
          <div className="text-2xl font-bold text-white">5 Days</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">League</h3>
          <div className="text-2xl font-bold text-purple-400">Gold II</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;