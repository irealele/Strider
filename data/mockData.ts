import { UserProfile, LeaderboardEntry } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  username: 'The_LEGEND_0rZaNN',
  clan: 'Studenți ASE',
  stepsToday: 0,
  walletBalance: 1250,
  joinDate: '12 Nov 2025',
  totalSteps: 452000,
  totalDistanceKm: 315,
  duelsWon: 42,
  duelsLost: 1,
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TheLegend_Formal&topType=ShortHairTheCaesarSidePart&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&skinColor=Light&jGraphicType=None',
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, username: '@fit_king', clan: 'Poli', score: 145000, avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=king' },
  { rank: 2, username: '@runner_girl', clan: 'UNEF', score: 132000, avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=girl' },
  { rank: 3, username: 'The_LEGEND_0rZaNN', clan: 'Studenți ASE', score: 98000, avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TheLegend_Formal&topType=ShortHairTheCaesarSidePart&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&skinColor=Light&jGraphicType=None' },
  { rank: 4, username: '@lazy_dave', clan: 'Dristor', score: 85000, avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=dave' },
  { rank: 5, username: '@hustler_v', clan: 'Studenți ASE', score: 72000, avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=v' },
];