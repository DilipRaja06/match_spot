import React from 'react';
import { User, Venue } from '../types';
import { LogoIcon, BackIcon, GhostIcon, SparklesIcon, MessageIcon } from './Icons';

interface HeaderProps {
  user: User;
  venue: Venue | null;
  onBack?: () => void;
  isGhostMode: boolean;
  onToggleGhostMode: () => void;
  matchCount: number;
  onShowMatches: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, venue, onBack, isGhostMode, onToggleGhostMode, matchCount, onShowMatches }) => {
  return (
    <header className="w-full p-4 bg-black/30 backdrop-blur-sm shadow-lg flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        {onBack ? (
          <button onClick={onBack} className="text-white hover:text-pink-400 transition-colors">
            <BackIcon />
          </button>
        ) : (
          <LogoIcon />
        )}
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            MatchSpot 
            <SparklesIcon className="w-5 h-5 text-pink-400" />
          </h1>
          {venue && <p className="text-xs text-gray-300">{venue.name}</p>}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {venue && (
           <button onClick={onShowMatches} className="relative text-white hover:text-pink-400 transition-colors">
            <MessageIcon />
            {matchCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-gray-900">
                {matchCount}
              </span>
            )}
          </button>
        )}
        <button onClick={onToggleGhostMode} className={`p-2 rounded-full transition-colors ${isGhostMode ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'}`}>
          <GhostIcon />
        </button>
        <img src={user.liveImageUrl || user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover" />
      </div>
    </header>
  );
};

export default Header;