import React, { useState } from 'react';
import { Duel, UserProfile } from '../types';
import { formatCurrency } from '../utils';
import { Swords, Clock, Trophy, Plus, CheckCircle2 } from 'lucide-react';
import { analyzeDuelMatchup, getCoachMessage } from '../services/geminiService';

interface DuelsViewProps {
  activeDuels: Duel[];
  user: UserProfile;
  onCreateDuel: (duel: Duel) => void;
}

const DuelsView: React.FC<DuelsViewProps> = ({ activeDuels, user, onCreateDuel }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [opponentName, setOpponentName] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [hypeText, setHypeText] = useState('');
  const [victoryMessage, setVictoryMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!opponentName || stakeAmount <= 0) return;

    setLoadingAnalysis(true);
    // Use Gemini to generate a hype message before confirming
    const hype = await analyzeDuelMatchup(user.username, opponentName, stakeAmount);
    setHypeText(hype);
    setLoadingAnalysis(false);

    const newDuel: Duel = {
      id: Date.now().toString(),
      challenger: user.username,
      opponent: opponentName,
      stake: stakeAmount,
      durationHours: 24,
      status: 'active',
    };
    
    // In a real app we'd wait for confirmation, but here we just add it
    setTimeout(() => {
        onCreateDuel(newDuel);
        setIsCreating(false);
        setOpponentName('');
        setHypeText('');
    }, 1500); 
  };

  const handleClaimWin = async (duelId: string) => {
    // Demo functionality to trigger "duel_win" context
    setVictoryMessage("Verifying victory on blockchain...");
    const msg = await getCoachMessage(user.stepsToday, 'duel_win');
    setVictoryMessage(msg);
    // In a real app, this would update state, but here we just show the hype
  };

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Active Duels</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-full shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      {isCreating && (
        <div className="bg-slate-900 border border-violet-900/50 p-6 rounded-2xl animate-fade-in mb-6">
          <h2 className="text-lg font-bold text-white mb-4">New Challenge</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Opponent Username</label>
              <input 
                type="text" 
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-violet-500"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Stake (Coins)</label>
              <input 
                type="number" 
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {hypeText && (
               <div className="bg-violet-900/20 border border-violet-500/30 p-3 rounded-lg text-sm text-violet-200 italic">
                 "{hypeText}"
               </div>
            )}

            <button 
              onClick={handleCreate}
              disabled={loadingAnalysis}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl flex items-center justify-center"
            >
              {loadingAnalysis ? 'Analyzing Matchup...' : (hypeText ? 'Confirm Duel!' : 'Generate Hype & Create')}
            </button>
          </div>
        </div>
      )}

      {/* Victory Toast */}
      {victoryMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-100 p-4 rounded-xl animate-fade-in flex items-start space-x-3">
             <Trophy className="shrink-0 text-green-400" size={24} />
             <div>
                <p className="font-bold text-sm">VICTORY!</p>
                <p className="text-xs italic mt-1">"{victoryMessage}"</p>
                <button onClick={() => setVictoryMessage(null)} className="text-xs underline mt-2 text-green-300">Dismiss</button>
             </div>
        </div>
      )}

      <div className="space-y-4">
        {activeDuels.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Swords size={48} className="mx-auto mb-4 opacity-50" />
            <p>No active duels. Start a fight!</p>
          </div>
        ) : (
          activeDuels.map((duel) => (
            <div key={duel.id} className="bg-slate-900 rounded-xl p-5 border border-slate-800 relative overflow-hidden group">
               {/* Visual Accent */}
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>

               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                     <span className="font-bold text-white">{duel.challenger}</span>
                     <span className="text-xs text-slate-500">VS</span>
                     <span className="font-bold text-white">{duel.opponent}</span>
                  </div>
                  <div className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-yellow-400 border border-slate-700">
                    {duel.stake} STRIDE
                  </div>
               </div>

               <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{duel.durationHours}h remaining</span>
                  </div>
                  <div className="flex items-center space-x-1 text-violet-400">
                    <Trophy size={14} />
                    <span>Pot: {formatCurrency(duel.stake * 2)}</span>
                  </div>
               </div>

               {/* Demo "Win" Button */}
               <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                   <button 
                     onClick={() => handleClaimWin(duel.id)}
                     className="text-xs flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                   >
                     <CheckCircle2 size={14} />
                     <span>Simulate Win</span>
                   </button>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DuelsView;