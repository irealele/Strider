import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Duel, ChatMessage } from '../types';
import { generateCoachMessage } from '../services/geminiService';
import { Zap, Send } from 'lucide-react';

interface AICoachProps {
  user: UserProfile;
  recentDuels: Duel[];
}

const AICoach: React.FC<AICoachProps> = ({ user, recentDuels }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Salut! StriderBot here. You walking or just scrolling pe TikTok? 🏃‍♂️" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateCoachMessage(user, recentDuels, input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-slate-800 rounded-full">
            <Zap className="text-yellow-400" size={20} />
          </div>
          <div>
            <h2 className="text-white font-bold flex items-center gap-2">
              StriderBot <span className="live-indicator">●</span>
            </h2>
            <p className="text-xs text-slate-400">Powered by Gemini 2.5</p>
          </div>
        </div>
      </div>

      <div className="message-list" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'mine' : 'others'}`}>
            <span className="chat-user">{msg.role === 'user' ? 'YOU' : 'BOT'}</span>
            {msg.text}
          </div>
        ))}
        {loading && (
           <div className="chat-bubble others">
             <div className="flex space-x-1 items-center h-5">
               <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms'}}></div>
               <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms'}}></div>
               <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms'}}></div>
             </div>
           </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for tips..."
          className="chat-input"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="send-btn"
        >
          <Send size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default AICoach;