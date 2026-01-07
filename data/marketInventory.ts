import { Voucher } from '../types';

export const INVENTORY: Voucher[] = [
  // --- TIER 1: THE FUEL (Daily Student Needs) ---
  {
    id: 'v1',
    title: 'Upgrade la Grande',
    brand: '5 to go',
    cost: 250, // ~10 Days of walking
    category: 'Fuel',
    description: 'Pay standard, drink large. The classic student hack.'
  },
  {
    id: 'v2',
    title: 'Free Energy Dose',
    brand: 'Hell/Red Bull',
    cost: 450, // ~2.5 Weeks
    category: 'Fuel',
    description: 'Exam session survival kit. One free can.'
  },
  {
    id: 'v3',
    title: '1+1 Cappuccino',
    brand: 'Ted’s Coffee',
    cost: 600, // ~3 Weeks
    category: 'Fuel',
    description: 'Date night or study buddy. Buy one, get one free.'
  },

  // --- TIER 2: THE MUNCHIES (Guilty Pleasures) ---
  {
    id: 'v4',
    title: 'Free Hot Booster',
    brand: 'KFC',
    cost: 350, // ~2 Weeks
    category: 'Munchies',
    description: 'Add a kick to your Smart Menu. Free Hot Booster.'
  },
  {
    id: 'v5',
    title: 'McCombo Student',
    brand: "McDonald's",
    cost: 500, // ~3 Weeks
    category: 'Munchies',
    description: 'Secret Menu: Cheeseburger + Fries + Coke.'
  },
  {
    id: 'v6',
    title: 'Free Delivery',
    brand: 'Glovo',
    cost: 850, // ~1 Month
    category: 'Munchies',
    description: 'Raining outside? Delivery fee is on us (max 15 RON).'
  },

  // --- TIER 3: THE DRIP & TECH (Aspirational) ---
  {
    id: 'v7',
    title: '-20% Bakery',
    brand: 'Lidl',
    cost: 400,
    category: 'Smart Shopping',
    description: 'Fresh out the oven. Discount on all pastry items.'
  },
  {
    id: 'v8',
    title: '-15% Student Discount',
    brand: 'H&M/Bershka',
    cost: 2500, // ~3-4 Months (Requires Duels)
    category: 'Drip',
    description: 'New semester, new fit. Valid on full-price items.'
  },
  {
    id: 'v9',
    title: '50 RON Voucher',
    brand: 'Flip.ro',
    cost: 5000, // ~6 Months (The Whale Reward)
    category: 'Smart Shopping',
    description: 'Upgrade your phone. Valid for any purchase > 500 RON.'
  }
];