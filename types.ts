
export interface User {
  id: number;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  liveImageUrl?: string; // For the in-venue selfie
  currentVenueId: number;
  tags?: string[]; // New field for preferences
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  musicType: string;
  crowdLevel: number; // Percentage 0-100
  currentSong: string;
}

export interface Interaction {
  type: 'question' | 'game' | 'challenge' | 'prompt';
  content: string;
  bold_move?: string; // Actionable advice for introverts
}

export interface Coupon {
  title: string;
  description: string;
  code: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isSelf: boolean;
}

export interface Match {
  user: User;
  interaction: Interaction;
  coupon: Coupon;
  timestamp: Date;
  messages: ChatMessage[];
}
