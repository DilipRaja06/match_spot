
import React from 'react';
import { Match } from '../types';
import { BackIcon, MessageIcon, GiftIcon } from './Icons';

interface MatchedListProps {
  matches: Match[];
  isOpen: boolean;
  onClose: () => void;
  onSelectMatch: (match: Match) => void;
}

const MatchedList: React.FC<MatchedListProps> = ({ matches, isOpen, onClose, onSelectMatch }) => {
    const timeSince = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) { return Math.floor(interval) + "y ago"; }
        interval = seconds / 2592000;
        if (interval > 1) { return Math.floor(interval) + "mo ago"; }
        interval = seconds / 86400;
        if (interval > 1) { return Math.floor(interval) + "d ago"; }
        interval = seconds / 3600;
        if (interval > 1) { return Math.floor(interval) + "h ago"; }
        interval = seconds / 60;
        if (interval > 1) { return Math.floor(interval) + "m ago"; }
        return "Just now";
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full max-w-md`}
    >
      <div className="flex flex-col h-full">
        <header className="p-4 bg-gray-800/50 backdrop-blur-sm flex items-center justify-between border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageIcon /> Your Matches
          </h2>
          <button onClick={onClose} className="text-white hover:text-pink-400">
             <BackIcon />
          </button>
        </header>

        {matches.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <p className="text-gray-400">You haven't made any matches yet.</p>
            <p className="text-gray-500 text-sm">Keep swiping to find a connection!</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-2">
            {matches.map((match) => (
              <div 
                key={match.user.id} 
                onClick={() => onSelectMatch(match)}
                className="p-3 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer flex items-start gap-4 relative group"
              >
                <img src={match.user.liveImageUrl || match.user.imageUrl} alt={match.user.name} className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white">{match.user.name}</h3>
                    <span className="text-xs text-gray-500">{timeSince(match.timestamp)}</span>
                  </div>
                  
                  {match.messages.length > 0 ? (
                      <p className="text-gray-400 text-sm truncate pr-4 mt-1">{match.messages[match.messages.length - 1].text}</p>
                  ) : (
                      <div className="mt-1 p-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-lg text-sm text-white border border-pink-500/30">
                        <p className="font-bold text-pink-200 capitalize text-xs">{capitalize(match.interaction.type)}</p>
                        <p className="italic text-gray-300 text-xs truncate">"{match.interaction.content}"</p>
                      </div>
                  )}

                   {match.coupon && (
                     <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                       <GiftIcon className="w-4 h-4" />
                       <span>{match.coupon.title} available!</span>
                     </div>
                   )}
                </div>
                {/* Unread indicator placeholder - logic can be added later */}
                {match.messages.length > 0 && !match.messages[match.messages.length - 1].isSelf && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedList;
