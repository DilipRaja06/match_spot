
import { GoogleGenAI, Type } from "@google/genai";
import { Interaction, User } from '../types';

const getApiKey = (): string => {
    // Return empty string if not set, allowing the service to fail gracefully to fallback
    return process.env.API_KEY || "";
};

const FALLBACK_BOLD_MOVES = [
  "Walk over and show them this screen without saying a word.",
  "Raise your glass to them from across the room, then walk over.",
  "Go ask them if they want to use the 2-for-1 coupon with you.",
  "Send a wave and wait for them to wave back before approaching.",
  "Walk past them, pause, and ask 'Do I know you from the app?'",
  "Challenge them to Rock, Paper, Scissors from across the room.",
  "Point at their drink and give a thumbs up, then approach.",
  "Walk over and say 'The app told me to talk to you, so here I am.'",
  "Make eye contact, count to three, then smile and walk over.",
  "Send a drink their way (physically or metaphorically) and see if they smile.",
  "Go stand next to them and say 'I think we're supposed to be friends.'"
];

const FALLBACK_QUESTIONS = [
  "If you were a cocktail, what would you be and why?",
  "What is the worst pickup line you have heard tonight?",
  "Rate the DJ on a scale of 1 to 10.",
  "What is your go-to karaoke song?",
  "Truth or Dare: Show me the last photo you took.",
  "If you could be anywhere else right now, where would it be?",
  "Tequila or Whiskey? Choose wisely.",
  "Who is your celebrity crush?",
  "What is your biggest red flag?",
  "Do you believe in love at first swipe?"
];

const FALLBACK_CHAT_REPLIES = [
  "Haha that's wild!",
  "Totally agree.",
  "I'm heading to the bar, want anything?",
  "The music is so loud I can barely hear you lol",
  "Come find me on the dance floor!",
  "😉",
  "For sure!",
  "No way, really?",
  "That's hilarious.",
  "Tell me more about that.",
  "I was just thinking the same thing!"
];

export const getInteraction = async (): Promise<Interaction> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error("No API Key");

    const ai = new GoogleGenAI({ apiKey });
    
    const boldMoveStyles = [
      "Non-verbal confidence (e.g., eye contact, specific gestures, winking)",
      "Playful prop usage (e.g., show phone screen, toast with drink, use a napkin)",
      "Direct physical approach (e.g., walk over immediately with a specific opening line)",
      "Silly/Ice-breaking (e.g., funny face, mime something, hand game from afar)",
      "Mystery/Intrigue (e.g., pretend to recognize them, write a note)",
      "Complimentary (e.g., point to their outfit/shoes/drink and thumbs up)",
      "Group engagement (e.g., get your friend to high five them)"
    ];
    
    const randomStyle = boldMoveStyles[Math.floor(Math.random() * boldMoveStyles.length)];

    const prompt = `Generate a fun interaction for two people who just matched at a nightclub. 
    
    Return a JSON object with three fields:
    1. "type": one of "question", "game", "challenge".
    2. "content": a short string (under 20 words) for the interaction.
    3. "bold_move": A specific, physical, low-pressure action designed to help an introvert approach their match confidently. It should be a direct instruction.
    
    IMPORTANT: The "bold_move" MUST follow this specific style: "${randomStyle}".
    Ensure the move is unique, creative, and actionable.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ['question', 'game', 'challenge', 'prompt'] },
            content: { type: Type.STRING },
            bold_move: { type: Type.STRING }
          },
          required: ['type', 'content', 'bold_move']
        }
      }
    });

    const jsonString = response.text?.trim();
    if (jsonString) {
      const parsed = JSON.parse(jsonString);
      // Basic validation
      if (parsed.type && parsed.content && parsed.bold_move) {
        return parsed as Interaction;
      }
    }
    throw new Error("Invalid JSON response");

  } catch (error) {
    // Log as warning to avoid cluttering console with 429s
    console.warn("Using fallback interaction due to API limit/error.");
    
    const randomBoldMove = FALLBACK_BOLD_MOVES[Math.floor(Math.random() * FALLBACK_BOLD_MOVES.length)];
    const randomQuestion = FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
    
    return {
      type: 'question',
      content: randomQuestion,
      bold_move: randomBoldMove
    };
  }
};

export const getChatReply = async (user: User, lastMessage: string): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error("No API Key");

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are roleplaying as ${user.name}, a ${user.age}-year-old at a club.
    Your Bio: "${user.bio}"
    Your Vibe/Tags: ${user.tags?.join(', ')}.
    
    The user just sent you this message: "${lastMessage}"
    
    Reply to them.
    Rules:
    - Keep it short (under 15 words).
    - Be casual, slightly flirty or friendly depending on the bio.
    - Respond directly to their text.
    - Do not include hashtags or emojis unless appropriate for the persona.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text?.trim() || FALLBACK_CHAT_REPLIES[0];
  } catch (error) {
    console.warn("Using fallback chat reply due to API limit/error.");
    const randomReply = FALLBACK_CHAT_REPLIES[Math.floor(Math.random() * FALLBACK_CHAT_REPLIES.length)];
    return randomReply;
  }
};
