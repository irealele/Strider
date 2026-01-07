import { Voucher } from './types';

// --- THE ALGORITHM V2.0 ---
// Base Rate: 1000 Steps = 2 SC
export const MINTING_RATE_PER_1000 = 2;
export const DAILY_STEP_CAP = 15000;

export const calculateEarnings = (steps: number): number => {
  // 1. Cap the steps to prevent fraud
  const cappedSteps = Math.min(steps, DAILY_STEP_CAP);
  
  // 2. Calculate blocks of 1000
  const blocks = Math.floor(cappedSteps / 1000);
  
  // 3. Apply Rate
  return blocks * MINTING_RATE_PER_1000;
};

export const calculateMarginalEarnings = (currentSteps: number, additionalSteps: number): number => {
  const oldEarnings = calculateEarnings(currentSteps);
  const newEarnings = calculateEarnings(currentSteps + additionalSteps);
  return newEarnings - oldEarnings;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// --- SOUND ENGINE (Synthesized for instant feedback) ---
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export const playSound = (type: 'click' | 'success' | 'message') => {
  if (!audioCtx) return;
  // Ensure context is running (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;

  switch (type) {
    case 'click':
      // Sharp UI Click (High pitch sine with fast decay)
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.03);
      
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      
      oscillator.start(now);
      oscillator.stop(now + 0.05);
      break;

    case 'success':
      // Arcade "Coin" (Two tones: B5 -> E6)
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(987.77, now); // B5
      oscillator.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.linearRampToValueAtTime(0.05, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      break;

    case 'message':
      // "Pop" sound (Frequency sweep up)
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.linearRampToValueAtTime(800, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      oscillator.start(now);
      oscillator.stop(now + 0.15);
      break;
  }
};