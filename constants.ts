
import { User, Venue, Coupon } from './types';

export const VENUES: Venue[] = [
  {
    id: 1,
    name: 'The Neon Cat',
    address: '123 Electric Ave, Austin, TX',
    imageUrl: 'https://picsum.photos/seed/venue1/800/600',
    musicType: 'EDM & House',
    crowdLevel: 92,
    currentSong: 'Titanium - David Guetta ft. Sia'
  },
  {
    id: 2,
    name: 'The Velvet Rope',
    address: '456 Groove St, New York, NY',
    imageUrl: 'https://picsum.photos/seed/venue2/800/600',
    musicType: 'Hip Hop & R&B',
    crowdLevel: 78,
    currentSong: 'Not Like Us - Kendrick Lamar'
  },
  {
    id: 3,
    name: 'Starlight Lounge',
    address: '789 Cosmo Blvd, Los Angeles, CA',
    imageUrl: 'https://picsum.photos/seed/venue3/800/600',
    musicType: 'Top 40 & Pop',
    crowdLevel: 45,
    currentSong: 'Espresso - Sabrina Carpenter'
  },
   {
    id: 4,
    name: 'The Rusty Mug',
    address: '101 Beer Rd, Denver, CO',
    imageUrl: 'https://picsum.photos/seed/venue4/800/600',
    musicType: 'Indie Rock',
    crowdLevel: 25,
    currentSong: 'A-Punk - Vampire Weekend'
  },
];

export const USERS: User[] = [
  {
    id: 1,
    name: 'Alex',
    age: 28,
    bio: 'Software engineer by day, dance floor enthusiast by night. Looking for someone to share a laugh and a drink with.',
    imageUrl: 'https://picsum.photos/seed/user1/400/600',
    currentVenueId: 1,
    tags: ['Here to Dance', 'Cocktails', 'Riding Solo']
  },
  {
    id: 2,
    name: 'Brianna',
    age: 25,
    bio: 'Graphic designer with a passion for spicy food and good music. Let\'s find the best taco truck after this.',
    imageUrl: 'https://picsum.photos/seed/user2/400/600',
    currentVenueId: 1,
    tags: ['Make Friends', 'Tequila', 'With the Crew']
  },
  {
    id: 3,
    name: 'Carlos',
    age: 30,
    bio: 'Just moved here! Exploring the city one bar at a time. Show me your favorite spot?',
    imageUrl: 'https://picsum.photos/seed/user3/400/600',
    currentVenueId: 1,
    tags: ['Find a Date', 'Beer', 'New in Town']
  },
  {
    id: 4,
    name: 'Diana',
    age: 27,
    bio: 'Veterinarian. Will probably talk about your dog. My dog is the best, but I\'m open to being proven wrong.',
    imageUrl: 'https://picsum.photos/seed/user4/400/600',
    currentVenueId: 1,
    tags: ['Just Chill', 'Wine', 'Dog Lover']
  },
  {
    id: 5,
    name: 'Ethan',
    age: 29,
    bio: 'Musician and aspiring chef. I can play you a song or make you pasta. Or both.',
    imageUrl: 'https://picsum.photos/seed/user5/400/600',
    currentVenueId: 1,
    tags: ['Flirting', 'Whiskey', 'Artist']
  },
  {
    id: 6,
    name: 'Fiona',
    age: 26,
    bio: 'Travel blogger who is surprisingly bad at navigating. Let\'s get lost together.',
    imageUrl: 'https://picsum.photos/seed/user6/400/600',
    currentVenueId: 2,
    tags: ['Adventure', 'Gin & Tonic', 'Traveler']
  },
  {
    id: 7,
    name: 'George',
    age: 31,
    bio: 'Finance guy who promises not to be boring. My interests include hiking, comedy shows, and debating pineapple on pizza.',
    imageUrl: 'https://picsum.photos/seed/user7/400/600',
    currentVenueId: 2,
    tags: ['Conversation', 'Craft Beer', 'Foodie']
  },
  {
    id: 8,
    name: 'Hannah',
    age: 24,
    bio: 'Just finished my masters in psychology. Let\'s overthink things together over a cocktail.',
    imageUrl: 'https://picsum.photos/seed/user8/400/600',
    currentVenueId: 2,
    tags: ['People Watching', 'Martini', 'Deep Chats']
  },
   {
    id: 9,
    name: 'Ian',
    age: 28,
    bio: 'Architect. I like building things, both with LEGOs and in real life. Looking for my missing piece.',
    imageUrl: 'https://picsum.photos/seed/user9/400/600',
    currentVenueId: 3,
    tags: ['Find a Date', 'Old Fashioned', 'Creative']
  },
  {
    id: 10,
    name: 'Julia',
    age: 27,
    bio: 'Yoga instructor and coffee addict. My aura is probably caffeine-colored.',
    imageUrl: 'https://picsum.photos/seed/user10/400/600',
    currentVenueId: 3,
    tags: ['Good Vibes', 'Mocktails', 'Spiritual']
  },
   {
    id: 11,
    name: 'Kevin',
    age: 29,
    bio: 'Marketing exec. I can sell anything. Right now, I\'m selling you on the idea of buying me a drink.',
    imageUrl: 'https://picsum.photos/seed/user11/400/600',
    currentVenueId: 4,
    tags: ['Network', 'Scotch', 'Ambitious']
  },
  {
    id: 12,
    name: 'Laura',
    age: 26,
    bio: 'Loves dogs, dad jokes, and dancing off-beat. If you can handle all three, we\'ll get along.',
    imageUrl: 'https://picsum.photos/seed/user12/400/600',
    currentVenueId: 4,
    tags: ['Here to Dance', 'Vodka Soda', 'Fun']
  }
];

export const COUPONS: Coupon[] = [
    {
        title: "2-for-1 Cocktails",
        description: "Get two signature cocktails for the price of one.",
        code: "MATCHDRINK"
    },
    {
        title: "Free Appetizer",
        description: "Share a delicious appetizer on us with the purchase of two drinks.",
        code: "MATCHBITE"
    },
    {
        title: "15% Off First Round",
        description: "Enjoy 15% off your first round of drinks together.",
        code: "MATCHROUND"
    },
    {
        title: "Priority Bar Access",
        description: "Skip the line at the bar for your first order.",
        code: "MATCHVIP"
    }
]
