import { GoogleGenAI } from "@google/genai";
import { UserProfile, Duel } from "../types";
import { INVENTORY } from "../data/marketInventory";

// Initialize Gemini Client
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_PROMPT = `
Role: You are 'StriderBot', an AI coach for a Move-to-Earn app used by Gen Z.
Tone: Punchy, street-smart, slightly sarcastic but helpful.
Goal: Give users a specific "Tip of the Day" about:
1. App Strategy (Banking coins before midnight, winning duels, checking the shop).
2. Walking Efficiency (Posture, speed).
3. Health (Hydration, sleep).

Constraint: Maximum 15 words. No hashtags.
`;

// Original Chat Function (Updated with new Persona)
export const generateCoachMessage = async (
  profile: UserProfile,
  recentDuels: Duel[],
  userMessage: string
): Promise<string> => {
  if (!apiKey) return "AI Coach offline. Nu am semnal la metrou.";

  const prompt = `
    ${SYSTEM_PROMPT}
    
    User Profile:
    - Name: ${profile.username}
    - Clan: ${profile.clan || "No Clan"}
    - Steps Today: ${profile.stepsToday}
    - Wallet: ${profile.walletBalance} $SC

    Recent Activity:
    ${recentDuels.map(d => `- Duel vs ${d.opponent}: ${d.status} (Stake: ${d.stake})`).join('\n')}

    User asks: "${userMessage}"

    Task: Answer the user. Maintain the persona.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.9,
      }
    });
    return response.text || "Hai la pași că nu se fac singuri!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Eroare la server. Mai încearcă, poate îți revii.";
  }
};

// New Requested Function: Tip of the Day
export const getCoachMessage = async (steps: number, context: 'morning' | 'lazy' | 'duel_win'): Promise<string> => {
  if (!apiKey) return "Pro Tip: Bank your steps before midnight or lose them forever.";

  // We ignore 'context' slightly to force tips, or mix them in.
  const prompt = `
    ${SYSTEM_PROMPT}
    User Steps: ${steps}.
    Task: Give me a short Tip or Trick for maximizing gains in the app or walking better.
  `;
  
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { maxOutputTokens: 50 }
    });
    return result.text || "Pro Tip: Walk fast, earn fast.";
  } catch (e) {
    return "Pro Tip: Bank your steps before midnight or lose them forever.";
  }
};

export const analyzeDuelMatchup = async (challenger: string, opponent: string, stake: number): Promise<string> => {
  if (!apiKey) return "Matchup analysis unavailable.";
  
  const prompt = `
    ${SYSTEM_PROMPT}
    Analyze this duel: ${challenger} vs ${opponent} for ${stake} $SC.
    Generate a 1-sentence "Fight Night" intro. Use Romanian slang if possible.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text || "Bătaie mare pe monede!";
  } catch (e) {
    return "Fight!";
  }
};

export const getShoppingAdvice = async (balance: number): Promise<string> => {
  if (!apiKey) return "Spend wisely.";

  // Filter what they can actually afford to save tokens
  const affordable = INVENTORY.filter(i => i.cost <= balance).map(i => i.title).join(", ");
  
  const prompt = `
    ${SYSTEM_PROMPT}
    User Balance: ${balance} Stride Coins ($SC).
    Affordable items: ${affordable || "Nothing yet"}.
    
    Task: Suggest ONE specific item they should buy or tell them to save up for a "Grail" (expensive item) if they are broke.
  `;

  try {
    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { maxOutputTokens: 50 }
    });
    return result.text || "Grind for that 5 to go coffee.";
  } catch (e) {
    return "Grind for that 5 to go coffee.";
  }
};