import './SectionStyles.css';
import { SectionHeader } from './SectionHeader';

// EXTENSIVE MOCK HISTORY
const HISTORY_DATA = [
  { id: 1, date: 'Today, 10:30', type: 'walk', val: '+4,500 Steps', coin: '+450 $SC' },
  { id: 2, date: 'Yesterday, 21:00', type: 'duel', val: 'Won vs @alex_ro', coin: '+1,000 $SC' },
  { id: 3, date: 'Yesterday, 14:20', type: 'walk', val: '+12,000 Steps', coin: '+960 $SC' },
  { id: 4, date: '13 Dec', type: 'shop', val: 'Purchased 5 to go', coin: '-200 $SC' },
  { id: 5, date: '13 Dec', type: 'walk', val: '+8,000 Steps', coin: '+800 $SC' },
  { id: 6, date: '12 Dec', type: 'bonus', val: 'Clan Wknd Bonus', coin: '+500 $SC' },
  { id: 7, date: '12 Dec', type: 'duel', val: 'Lost vs @fit_king', coin: '-500 $SC' },
  { id: 8, date: '12 Dec', type: 'walk', val: '+15,400 Steps', coin: '+1,200 $SC' },
  { id: 9, date: '11 Dec', type: 'shop', val: 'Purchased McDonald\'s', coin: '-500 $SC' },
  { id: 10, date: '11 Dec', type: 'walk', val: '+6,200 Steps', coin: '+620 $SC' },
  { id: 11, date: '10 Dec', type: 'duel', val: 'Won vs @lazy_dave', coin: '+800 $SC' },
  { id: 12, date: '09 Dec', type: 'walk', val: '+10,000 Steps', coin: '+1,000 $SC' },
  { id: 13, date: '08 Dec', type: 'walk', val: '+9,500 Steps', coin: '+950 $SC' },
  { id: 14, date: '07 Dec', type: 'shop', val: 'Red Bull Dose', coin: '-450 $SC' },
  { id: 15, date: '07 Dec', type: 'walk', val: '+3,200 Steps (Lazy)', coin: '+320 $SC' },
  { id: 16, date: '06 Dec', type: 'duel', val: 'Won vs @speedy', coin: '+1,500 $SC' },
  { id: 17, date: '05 Dec', type: 'walk', val: '+18,000 Steps', coin: '+1,440 $SC' },
  { id: 18, date: '05 Dec', type: 'bonus', val: 'Daily Streak (7)', coin: '+100 $SC' },
  { id: 19, date: '04 Dec', type: 'shop', val: 'Cinema City Tkt', coin: '-1,000 $SC' },
  { id: 20, date: '04 Dec', type: 'walk', val: '+11,000 Steps', coin: '+1,100 $SC' },
];

export const History = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="page-container"> {/* Removed animate-slide-up class as it's now in CSS */}
      
      {/* NEW STANDARDIZED HEADER */}
      <SectionHeader title="History" onBack={onBack} />

      <div className="history-list" style={{ paddingBottom: '80px' }}>
        {HISTORY_DATA.map((item) => (
          <div key={item.id} className="history-item">
            <div className={`icon-box ${item.type}`}>
              {item.type === 'walk' && '👟'}
              {item.type === 'duel' && '⚔️'}
              {item.type === 'shop' && '🛒'}
              {item.type === 'bonus' && '🎁'}
            </div>
            <div className="history-info">
              <span className="h-date">{item.date}</span>
              <span className="h-val">{item.val}</span>
            </div>
            <span className={`h-coin ${item.coin.includes('-') ? 'neg' : 'pos'}`}>
              {item.coin}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};