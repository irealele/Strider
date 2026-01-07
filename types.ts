export interface UserProfile {
  id: string;
  username: string; // e.g., @alex
  clan?: string; // e.g., "Studenți ASE"
  // Daily Stats
  stepsToday: number;
  walletBalance: number;
  // Lifetime Stats (from first login)
  joinDate: string;
  totalSteps: number;
  totalDistanceKm: number;
  duelsWon: number;
  duelsLost: number;
  avatarUrl: string; // We will use a placeholder service
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  clan: string;
  score: number; // Weekly Steps
  avatarUrl: string;
}

export interface Duel {
  id: string;
  challenger: string;
  opponent: string;
  stake: number;
  durationHours: number;
  status: 'pending' | 'active' | 'finished';
  winner?: string;
}

export type ViewState = 'welcome' | 'onboarding' | 'home' | 'market' | 'rank' | 'chat' | 'profile' | 'clan-hq' | 'history' | 'my-vouchers' | 'settings' | 'statistics' | 'badges' | 'wallet';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type Category = 'Fuel' | 'Munchies' | 'Smart Shopping' | 'Drip' | 'Entertainment';

export interface Voucher {
  id: string;
  brand: string;
  title: string;
  cost: number;
  category: Category;
  description: string;
  isMystery?: boolean;
}