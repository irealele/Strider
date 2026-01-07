import { useState, useRef, useEffect } from 'react';
import './GlobalChat.css';

// --- 1. USER POOL ---
const GLOBAL_USERS = [
  { name: 'Fit_King', color: '#ff0050' },
  { name: 'Crypto_Walker', color: '#ccff00' },
  { name: 'Speedy_G', color: '#ffcc00' },
  { name: 'Marathon_Man', color: '#00f2ea' },
  { name: 'Voucher_Hunter', color: '#0097e6' },
  { name: 'Gym_Rat_99', color: '#ff4757' },
  { name: 'Step_God', color: '#ffd700' },
  { name: 'Walk_To_Earn', color: '#2ecc71' }
];

const CLAN_USERS = [
  { name: 'Samsar_Auto', color: '#e84118' },      
  { name: 'Maria_Econ', color: '#00a8ff' },       
  { name: 'Sebi_Restanta', color: '#fbc531' },    
  { name: 'Elena_Influencer', color: '#e056fd' }, 
  { name: 'Ionut_Marketing', color: '#9c88ff' },
  { name: 'Coffee_Addict', color: '#7f8c8d' },
  { name: 'Andrei_ASE', color: '#4cd137' },
  { name: 'Student_Obosit', color: '#546de5' },
  { name: 'Bombardierul_07', color: '#2f3542' },
  { name: 'Chef_La_Cutite', color: '#ff6b6b' },
  { name: 'Taximetrist_Pro', color: '#feca57' },
  { name: 'IT_istul_Sarat', color: '#48dbfb' }
];

// --- 2. SCRIPTS ---
const GLOBAL_SCRIPT = [
  "Anyone up for a 5k duel? ⚔️", "Just banked 15k steps. Legs are dead.", "When is the shop reset?",
  "I need 500 more coins for the Nike card.", "Bitcoin is up, but $SC is stable.", "Let's gooo!",
  "Who is top 1 globally?", "My GPS drifted and I lost 1km :(", "Respect the grind.", "WAGMI guys.",
  "Selling level 10 account (joke)", "Don't skip leg day.", "Walking > Driving.",
  "Server feels fast today.", "Can we trade items yet?", "My battery is dying help.",
  "Just unlocked the new badge!", "Anyone from London here?", "Steps didn't count, restarting app.",
  "Is the premium subscription worth it?", "My watch isn't syncing...", "Keep pushing guys!",
  "Road to 1 million steps.", "Need a walking buddy.", "Hydrate or diedrate."
];

const CLAN_SCRIPT = [
  "Vand Golf 4 ALH, nu bate nu troncane, fara fiscal.",
  "Schimb BMW pisicuta cu loc la camin in Moxa.",
  "Azi am stat 2 ore in trafic la Unirii, am facut pasii in masina dand din picior.",
  "Cine stie un mecanic bun care nu te fura?",
  "Mi-a expirat ITP-ul, merg pe risc.",
  "Am vazut control STB la Romana, aveti grija.",
  "Vand jante pe 16, accept si tichete de masa.",
  "Motorina s-a scumpit, trecem pe pasi.",
  "Daca mai aud o data 'soft arabesc' imi sterg contul.",
  "Masina mea valoreaza mai putin decat contul de Strider.",
  "Ba, m-a rupt sesiunea asta. Nu mai stiu cum ma cheama.",
  "Cine are cursuri vineri e sclavul sistemului.",
  "Voi ati primit bursa? Ca eu verific cardul din ora in ora.",
  "Ati vazut ce a postat profu pe classroom? Jale.",
  "Picam toti, intram in reexaminare, aia e.",
  "Cine are un incarcator de iPhone?",
  "Oare se supara daca intarzii 2 ore la seminar?",
  "Dau la schimb voucher 5togo pe o tema la Microeconomie.",
  "E cineva la biblioteca? Sa-mi tina si mie loc (vin in 3 ore).",
  "La multi ani 2025! A, stai ca am restante.",
  "Mi-a picat netul la camin, mor.",
  "Ce subiecte pica la Finante?",
  "Mai am 3 restante din anul 1, e bine.",
  "Am adormit la curs si m-a trezit proful.",
  "Cine stie in ce sala e examenul? Ca am uitat.",
  "Vand loc in fata la coada la secretariat.",
  "Cine merge la Mec la Romana?",
  "Nu mai am bani nici de pufuleti cu surprize.",
  "Cafeaua de la automat e apa de ploaie azi.",
  "Hai la o shaorma mica cu de toate.",
  "Mi-e o foame de nu mai vad pasii.",
  "Azi mancam la cantina sau suntem bogati?",
  "Dau o cafea cine ma ajuta cu proiectul.",
  "S-a scumpit Luca, nu se mai poate.",
  "Vreau un energizant, tremura carnea pe mine.",
  "Am pachet de la mama, cine vrea zacusca?",
  "Mancam si noi ceva sau facem fotosinteza?",
  "Cate monede aveti? Eu strang de adidasi.",
  "Am facut 20k pasi azi doar mergand dupa fete.",
  "Nu mai imi numara pasii cand alerg dupa autobuz.",
  "Facem un duel pe 100 de monede? Sau va e frica?",
  "Cine e pe locul 1 in clan? Ca vreau sa il depasesc.",
  "Daca merg cu trotineta se pun pasii? Intreb pt un prieten.",
  "Mi-am luat voucherul de la WorldClass, ma apuc de sala (de luni).",
  "Serverul merge cam greu sau e de la netul meu?",
  "Am uitat sa dau Bank la pasi aseara... imi vine sa plang.",
  "Cine vrea invite in clan? Ca am locuri.",
  "Las-o ca merge asa.",
  "Viata e grele.",
  "Mergem in club diseara sau invatam?",
  "S-a marit chiria in Cluj, ma mut in cort.",
  "Vand iPhone 6 blocat icloud, ieftin.",
  "Ma duc sa ma angajez la Glovo ca fac pasi si bani.",
  "Cine iese la o tigara in 5 min?",
  "Ba, e frig afara de ingheata pasii.",
  "Am vazut-o pe fosta cu altul, am bagat 30k pasi de nervi.",
  "Voi dormiti? Ca eu am insomnii.",
  "Ce faceti ma praduitorilor?",
  "Hai sa facem bani ca sa n-avem bani.",
  "Dau meditatii la 'cum sa treci anul fara sa inveti'.",
  "Noroc ca e aplicatia asta ca altfel nu ma miscam din pat.",
  "Maine ma apuc de dieta. Azi bag o pizza.",
  "Stiti bancul cu iarna? Iar n-am bani.",
  "Cine imi imprumuta 10 lei pana la bursa?",
  "Am pierdut la pacanele, macar aici sa castig.",
  "Vand Golf 4... a, scuze, am mai zis.",
  "Hai sa iesim in Herastrau la o tura.",
  "Cine are Netflix? Dau parola de la Disney.",
  "Ma doare spatele de la cat am stat pe scaun.",
  "Vreau vacanta inapoi.",
  "Cine vine la un fotbal diseara?",
  "Am facut febra musculara de la mers pe jos.",
  "Daca nu luam bursa, ne facem influenceri.",
  "Hai noroc si sanatate.",
  "Ce seriale mai bagati?",
  "Am sesiune in 2 saptamani si eu ma joc pe telefon.",
  "Nu mai fiti saraki.",
  "Bombardierii nu alearga, ei doar se grabesc incet.",
  "Am o combinatie, te bagi?",
  "Schimb 500 $SC pe o shaorma, urgent."
];

// --- 3. REPLIES ---
const RO_REPLIES: Record<string, string[]> = {
  'salut': ['Salut!', 'Neata colegu!', 'Servus.', 'Te pwp.', 'Salve.', 'Salutare sefule.'],
  'neata': ['Neata!', 'Lasa-ma sa dorm.', 'Cafea urgent.', 'Buna dimi la cafeluta.', 'De unde neata ca e pranz.'],
  'cf': ['Uite, fac pasi.', 'Stau, tu?', 'Ma plictisesc la curs.', 'Ma cert cu viata.', 'Grind pe Strider.'],
  'curs': ['Nu ma duc, e plictisitor.', 'Semnam prezenta si fugim?', 'Eu stau pe TikTok in spate.', 'Skip total.', 'Cine e proful?'],
  'examen': ['N-am invatat nimic.', 'Picam impreuna.', 'Restanta scrie pe mine.', 'E grila sau deschis?', 'Ma bazez pe copiat.'],
  'tema': ['Da-mi si mie copy paste.', 'O fac in pauza.', 'Chat GPT e baza.', 'Nu o fac, aia e.'],
  'bursa': ['Intra joi... la anul.', 'Mi-au intrat 10 lei, sunt bogat.', 'Bursa sociala for the win.', 'Asteapta mult si bine.'],
  'restanta': ['Lasa ca o luam in toamna.', '5 sa fie.', 'Eu am 4 restante, stai linistit.', 'Nici nu ma prezint.'],
  'sala': ['Nu stiu, intreaba pe grup.', 'Cred ca 2101.', 'In Moxa parca.', 'Nu veni ca nu se face.'],
  'bani': ['N-am nici de paine.', 'Muncim, nu gandim.', 'Imprumuta-ma pana la bursa.', 'Saracie mare.', 'Facem o combinatie?'],
  'job': ['Glovo scrie pe mine.', 'Call center direct.', 'OnlyFans? Glumesc... sau nu.', 'Caut ceva part-time.'],
  'scump': ['Inflatie frate.', 'Nu mai mancam azi.', 'S-a scumpit tot.'],
  'golf': ['Nu bate, nu troncane?', 'Fara fiscal nu iau.', 'Schimbi cu iPhone 6?', 'Km reali verificabili pe caiet?', 'ALH trage grav.'],
  'masina': ['Bemveul e baza.', 'Ai bani de benzina?', 'Vand eu passat b6, full fara piele.', 'Ia-ti trotineta.'],
  'fiscal': ['Se da doar pe sub mana.', 'Nu ofer fiscal, sunt samsar.', 'Fiscalul e un mit urban.', 'Ce e ala fiscal?'],
  'bmw': ['Semnalizarea e optionala.', 'Masina de baieti.', 'Trage de rupe.'],
  'mancare': ['Mec?', 'KFC?', 'Cantina Moxa?', 'Hai la o shaorma mica.', 'Am pachet de la mama :(', 'Comandam ceva?'],
  'shaorma': ['Cu de toate?', 'Baneasa sau Dristor?', 'Mi-e pofta rau.', 'Hai acum.'],
  'cafea': ['Mergem la 5togo?', 'Dau eu o cafea daca ai tigari.', 'Hai in pauza.', 'Direct in vena.', 'A 3-a pe azi.'],
  'tigara': ['Hai afara.', 'N-am, da-mi tu una.', 'M-am lasat (de 2 ore).', 'Hai la o pauza.'],
  'duel': ['Te provoc eu!', 'Hai ca ma bag.', 'Pe cati coins?', 'Nu ma bag, azi e leg day.', 'Te bat mar.'],
  'pasi': ['Cati ai azi?', 'Eu am facut 10k.', 'Nu imi numara bine.', 'Alearga mai repede.'],
  'coins': ['Strang de voucher.', 'Cate ai?', 'Da-mi si mie.', 'Sunt sarac si aici.'],
  'default': [
    'Amin!', 'Doamne ajuta.', 'Esti pe bune?', 'Ador.', 'Mor =))))', 
    'Corect.', 'Asa zic si eu.', 'Mda... viata de student.', 'Tare.', 
    'Hai sa tragem tare azi.', 'Nu cred asa ceva.', 'Bv frate.', 'Respect.',
    'Esti bombardier.', 'Lasa vrajeala.', 'Ce glume ai pe tine.'
  ]
};

const EN_REPLIES: Record<string, string[]> = {
  'hi': ['Yo!', 'Welcome back.', 'Hey legend.'],
  'hello': ['Hi there!', 'Greetings.'],
  'duel': ['I am down! Send invite.', 'I am out of energy lol.', 'High stakes only?'],
  'coins': ['Grind never stops.', 'I am saving for the Hoodie.', 'Mining is slow today.'],
  'shop': ['Shop resets Friday.', 'Sold out instantly :(', 'Got my voucher.'],
  'bug': ['Report it to dev.', 'Restart app.', 'GPS glitch?'],
  'sc': ['$SC to the moon 🚀', 'HODL your steps.'],
  'default': ['True that.', 'Keep grinding.', 'Respect.', 'LFG! 🔥', 'For real.', 'No pain no gain.']
};

interface Message {
  id: string;
  user: string;
  text: string;
  isMe: boolean;
  color?: string;
  // NEW: Timestamp field
  timestamp: string;
}

interface Props {
  myUsername: string;
  clanName?: string;
}

export const GlobalChat = ({ myUsername }: Props) => {
  const [activeTab, setActiveTab] = useState<'global' | 'clan' | 'friends'>('clan');
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const globalHistory = useRef<number[]>([]);
  const clanHistory = useRef<number[]>([]);

  // HELPER: Get current HH:MM
  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [globalMsgs, setGlobalMsgs] = useState<Message[]>([
    { id: 'g0', user: 'System', text: 'Welcome to Global Arena. English only.', isMe: false, color: '#666', timestamp: getTime() }
  ]);
  const [clanMsgs, setClanMsgs] = useState<Message[]>([
    { id: 'c0', user: 'Clan_Leader', text: 'Bine ati venit! Azi tintim Top 3. Spor la pasi!', isMe: false, color: '#00f2ea', timestamp: getTime() }
  ]);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [globalMsgs, clanMsgs, activeTab]);

  const getUniqueIndex = (length: number, history: number[]) => {
    let index;
    let attempts = 0;
    do {
      index = Math.floor(Math.random() * length);
      attempts++;
    } while (history.includes(index) && attempts < 20);
    
    history.push(index);
    if (history.length > 50) history.shift();
    
    return index;
  };

  useEffect(() => {
    // 2.75 Seconds Tick
    const interval = setInterval(() => {
      if (Math.random() > 0.1) {
        if (activeTab === 'global') {
          const user = GLOBAL_USERS[Math.floor(Math.random() * GLOBAL_USERS.length)];
          const idx = getUniqueIndex(GLOBAL_SCRIPT.length, globalHistory.current);
          addMessage('global', user.name, GLOBAL_SCRIPT[idx], user.color);
        } else if (activeTab === 'clan') {
          const user = CLAN_USERS[Math.floor(Math.random() * CLAN_USERS.length)];
          const idx = getUniqueIndex(CLAN_SCRIPT.length, clanHistory.current);
          addMessage('clan', user.name, CLAN_SCRIPT[idx], user.color);
        }
      }
    }, 2750); 

    return () => clearInterval(interval);
  }, [activeTab]);

  const addMessage = (tab: 'global' | 'clan', user: string, text: string, color?: string, isMe = false) => {
    const newMsg: Message = { 
      id: Date.now() + Math.random().toString(), 
      user, 
      text, 
      isMe, 
      color,
      timestamp: getTime() // Add Time
    };
    if (tab === 'global') setGlobalMsgs(prev => [...prev.slice(-49), newMsg]);
    else if (tab === 'clan') setClanMsgs(prev => [...prev.slice(-49), newMsg]);
  };

  const triggerAutoReply = (text: string, tab: 'global' | 'clan') => {
    const lowerText = text.toLowerCase();
    let replyText = "";
    let responder = { name: 'Bot', color: '#fff' };

    const dictionary = tab === 'clan' ? RO_REPLIES : EN_REPLIES;
    const pool = tab === 'clan' ? CLAN_USERS : GLOBAL_USERS;
    
    responder = pool[Math.floor(Math.random() * pool.length)];

    let found = false;
    for (const key in dictionary) {
      if (lowerText.includes(key) && key !== 'default') {
        const options = dictionary[key];
        replyText = options[Math.floor(Math.random() * options.length)];
        found = true;
        break;
      }
    }

    if (!found) {
      const options = dictionary['default'];
      replyText = options[Math.floor(Math.random() * options.length)];
    }

    setTimeout(() => {
      addMessage(tab, responder.name, replyText, responder.color);
    }, 2000 + Math.random() * 1000);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage(activeTab as 'global' | 'clan', myUsername, inputValue, undefined, true);
    
    if (activeTab === 'clan' || activeTab === 'global') {
      triggerAutoReply(inputValue, activeTab);
    }

    setInputValue("");
  };

  const renderMessages = (messages: Message[]) => (
    <div className="messages-area">
      {messages.map(msg => (
        <div key={msg.id} className={`chat-bubble ${msg.isMe ? 'mine' : 'theirs'}`}>
          {!msg.isMe && (
            <span className="chat-user-label" style={{ color: msg.color || '#ff0050' }}>
              {msg.user}
            </span>
          )}
          {msg.text}
          {/* RENDER THE TIMESTAMP */}
          <span className="chat-time">{msg.timestamp}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );

  return (
    <div className="page-container social-hub">
      <div className="social-tabs animate-slide-up">
        <button 
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button 
          className={`tab-btn ${activeTab === 'clan' ? 'active' : ''}`}
          onClick={() => setActiveTab('clan')}
        >
          My Clan
        </button>
        <button 
          className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`}
          onClick={() => setActiveTab('global')}
        >
          Global
        </button>
      </div>

      <div className="social-content">
        <div className="chat-header-bar">
          <div className="header-title">
            {activeTab === 'friends' && 'Private Messages'}
            {activeTab === 'clan' && <><span className="live-indicator">● LIVE </span> Studenți ASE</>}
            {activeTab === 'global' && <><span className="live-indicator">● LIVE </span> Global Arena</>}
          </div>
        </div>

        {activeTab === 'friends' && <div className="empty-state">Select a friend to chat (Mock)</div>}
        {activeTab === 'clan' && renderMessages(clanMsgs)}
        {activeTab === 'global' && renderMessages(globalMsgs)}

        <div className="input-bar">
          <input 
            type="text" 
            placeholder={activeTab === 'clan' ? "Zi ceva..." : "Type a message..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="send-icon-btn">➤</button>
        </div>
      </div>
    </div>
  );
};